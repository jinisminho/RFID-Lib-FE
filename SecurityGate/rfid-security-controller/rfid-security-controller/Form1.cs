using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using rfid_security_controller.api;
using rfid_security_controller.models;
using SimpleHttp;

namespace rfid_security_controller
{
    public partial class Form1 : Form
    {
        bool isConnected = false;
        bool isConnectedUhf = false;
        bool isCooldown = false;
        List<String> loggedCopyList = new List<string>();

        string[] ports;

        private void AppendTextPlus(RichTextBox txtBox, string text, Color color)
        {
            try
            {
                txtBox.SelectionStart = txtBox.TextLength;
                txtBox.SelectionLength = 0;

                txtBox.SelectionColor = color;
                txtBox.AppendText(text);
                txtBox.SelectionColor = txtBox.ForeColor;
                txtBox.ScrollToCaret();

            }
            catch (Exception)
            {

            }
        }

        private void AppendTextPlus(RichTextBox txtBox, string text)
        {
            txtBox.SelectionStart = txtBox.TextLength;
            txtBox.SelectionLength = 0;

            txtBox.AppendText(text);
            txtBox.SelectionColor = txtBox.ForeColor;
            txtBox.ScrollToCaret();
        }

        public Form1()
        {
            //new Thread(() =>
            //{
            //    while (true)
            //    {
            //        Thread.CurrentThread.IsBackground = true;
            //        /* run your code here */
            //        if (!isCooldown)
            //        {
            //            GetBorrowedBooks();
            //            isCooldown = true;
            //        }
            //        Thread.Sleep(3000);
            //        isCooldown = false;
            //        Console.WriteLine("waiting");
            //    }
            //}).Start();


            InitializeComponent();
            disableControls();
            getAvailableComPorts();
            RefreshLoggedList();
            ListenForHttpRequests();
            cbPorts.DropDownStyle = ComboBoxStyle.DropDownList;
            cbUhfPorts.DropDownStyle = ComboBoxStyle.DropDownList;

            foreach (string port in ports)
            {
                cbPorts.Items.Add(port);
                cbUhfPorts.Items.Add(port);
                if (ports[0] != null)
                {
                    cbPorts.SelectedItem = ports[0];
                    cbUhfPorts.SelectedItem = ports[0];
                }
            }
        }

        void getAvailableComPorts()
        {
            ports = SerialPort.GetPortNames();
        }

        private void disableControls()
        {
            chbLed1.Enabled = false;
            chbLed2.Enabled = false;
            chbLed3.Enabled = false;
            //txtBookList.Enabled = false;
            groupBox1.Enabled = false;
        }

        private void enableControls()
        {
            chbLed1.Enabled = true;
            chbLed2.Enabled = true;
            chbLed3.Enabled = true;
            groupBox1.Enabled = true;

        }

        private void resetDefaults()
        {
            chbLed1.Checked = false;
            chbLed2.Checked = false;
            chbLed3.Checked = false;
        }

        private void connectToArduino()
        {

            string selectedPort = cbPorts.GetItemText(cbPorts.SelectedItem);
            arduinoUnoPort.PortName = selectedPort;
            arduinoUnoPort.BaudRate = 9600;
            arduinoUnoPort.Parity = Parity.None;
            arduinoUnoPort.DataBits = 8;
            arduinoUnoPort.StopBits = StopBits.One;
            //port = new SerialPort(selectedPort, 9600, Parity.None, 8, StopBits.One);
            try
            {
                arduinoUnoPort.Open();
                arduinoUnoPort.Write("#CONX\n");
                isConnected = true;
            }
            catch (Exception e)
            {
                AppendTextPlus(txtMessage, GetCurrentTime() + e.Message + "\n", Color.Red);
            }
            if (isConnected)
            {
                btnConnectSerialPort.Text = "Disconnect";
                enableControls();
                AppendTextPlus(txtMessage, GetCurrentTime() + "Connected to alarm\n");
                txtMessage.ScrollToCaret();
                lblNotConnectAlarm.Hide();
            }

        }
        private void disconnectFromArduino()
        {
            try
            {
                arduinoUnoPort.Write("#DISC\n");
                arduinoUnoPort.Close();
                isConnected = false;

            }
            catch (Exception e)
            {
                AppendTextPlus(txtMessage, GetCurrentTime() + e.Message + "\n", Color.Red);
            }
            btnConnectSerialPort.Text = "Connect";
            disableControls();
            resetDefaults();
            AppendTextPlus(txtMessage, GetCurrentTime() + "Disconnected from alarm\n", Color.Red);
            lblNotConnectAlarm.Show();
        }

        private void btnConnectSerialPort_Click(object sender, EventArgs e)
        {
            if (!isConnected)
            {
                connectToArduino();
            }
            else
            {
                disconnectFromArduino();
            }
        }

        private void chbLed1_CheckedChanged(object sender, EventArgs e)
        {
            if (isConnected)
            {
                if (chbLed1.Checked)
                {
                    arduinoUnoPort.Write("#LEDRON\n");
                }
                else
                {
                    arduinoUnoPort.Write("#LEDROF\n");
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            arduinoUnoPort.Write("#ALRT\n");
        }

        private void arduinoUnoPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {

        }

        private void btnConnectUhf_Click(object sender, EventArgs e)
        {
            if (!isConnectedUhf)
            {
                connectToUhf();
            }
            else
            {
                disconnectFromUhf();
            }
        }

        private void disconnectFromUhf()
        {
            try
            {
                uhfPort.Write("#Goodbye Uhf\n");
                uhfPort.Close();
                isConnectedUhf = false;
            }
            catch (Exception e)
            {
                AppendTextPlus(txtMessage, GetCurrentTime() + e.Message + "\n", Color.Red);
            }
            if (!isConnectedUhf)
            {
                btnConnectUhf.Text = "Connect";
                AppendTextPlus(txtMessage, GetCurrentTime() + "Disconnected from scanner\n", Color.Red);
                lblNotConnectScanner.Show();
            }
        }

        private void connectToUhf()
        {
            string selectedPort = cbUhfPorts.GetItemText(cbUhfPorts.SelectedItem);
            uhfPort.PortName = selectedPort;
            uhfPort.BaudRate = 9600;
            uhfPort.Parity = Parity.None;
            uhfPort.DataBits = 8;
            uhfPort.StopBits = StopBits.One;
            try
            {
                uhfPort.Open();
                uhfPort.Write("#Hello this is Controller\n");
                isConnectedUhf = true;
            }
            catch (Exception e)
            {
                AppendTextPlus(txtMessage, GetCurrentTime() + e.Message + "\n", Color.Red);
            }
            if (isConnectedUhf)
            {
                btnConnectUhf.Text = "Disconnect";
                AppendTextPlus(txtMessage, GetCurrentTime() + "Connected to scanner\n");
                lblNotConnectScanner.Hide();
            }
        }

        // Ring the alarm when a not checked out book is detected
        private void uhfPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            if (uhfPort.IsOpen)
            {
                if (!isCooldown)
                {
                    GetBorrowedBooks();
                    Console.WriteLine("=========   Getting deactivated books");
                    isCooldown = true;
                }
                CheckCooldown();
                string rfid = "";
                try
                {
                    rfid = uhfPort.ReadLine();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }

                Console.WriteLine("Demo UID: " + rfid);
                if (!deactivatedBooks.Contains(rfid) && rfid != "")
                {
                    Console.WriteLine(GetCurrentTime() + "Alert: Not checked out book detected! (TID:" + rfid + ")");
                    //int id = GetCopyIdByRfid(tmp);
                    //Console.WriteLine("Book copy id: " + id);
                    arduinoUnoPort.WriteLine("#ALRT");
                    Console.WriteLine("!!!!!!!! ALERT !!!!!!!!!");
                    if (!loggedCopyList.Contains(rfid))
                    {
                        Console.WriteLine("======   Save log");
                        SaveLog(GetCopyIdByRfid(rfid));
                        loggedCopyList.Add(rfid);
                        Console.WriteLine("Added to list");
                        Thread.Sleep(100);
                    }
                }
            }
        }

        private void CheckCooldown()
        {
            Task ignoredAwaitableResult = this.CountCooldown();
        }

        private async Task CountCooldown()
        {
            await Task.Delay(3000);
            if (isCooldown)
            {
                isCooldown = false;
            }
        }

        private async Task RefreshLoggedList()
        {
            while (true)
            {
                await Task.Delay(30000);
                loggedCopyList = new List<string>();
            }
        }

        private void ListenForHttpRequests()
        {
            // Route.Add("/", (req, res, props) =>
            // {
            //     res.AsText("Hello");
            // });

            // HttpServer.ListenAsync(
            //6969,
            //CancellationToken.None,
            //Route.OnHttpRequestAsync
            //).Wait();

        }

        List<string> deactivatedBooks = new List<string>();
        private void GetBorrowedBooks()
        {
            Console.WriteLine("============================ Getting from DB");
            MyDbConnection myDb = new MyDbConnection();
            deactivatedBooks = myDb.GetBorrowedBooks();
            foreach (string rfid in deactivatedBooks)
            {
                Console.WriteLine(rfid);
            }
        }

        private int GetCopyIdByRfid(string rfid)
        {
            Console.WriteLine("============================ Getting from DB");
            MyDbConnection myDb = new MyDbConnection();
            return myDb.GetCopyIdByRfid(rfid);
        }

        private int SaveLog(int id)
        {
            Console.WriteLine("============================ Saving to DB");
            MyDbConnection myDb = new MyDbConnection();
            return myDb.SaveLog(id);
        }

        private String GetCurrentTime()
        {
            return DateTime.Parse(DateTime.Now.ToString()).ToString("HH:mm:ss") + ": ";
        }

        private async void button1_Click_1(object sender, EventArgs e)
        {
            if (uhfPort.IsOpen)
            {
                if (!isCooldown)
                {
                    BookListResponse rs = await SecurityAPI.getDeactivatedBooks();
                    if (rs.isSuccess)
                    {
                        deactivatedBooks = rs.rfids;
                    }
                    isCooldown = true;
                }
                CheckCooldown();
                string tmp = "E28068940000500BB95750AE";
                Console.WriteLine("Demo UID: " + tmp);
                if (!deactivatedBooks.Contains(tmp))
                {
                    Console.WriteLine(GetCurrentTime() + "Alert: Not checked out book detected! (TID:" + tmp + ")\n");
                    //int id = GetCopyIdByRfid(tmp);
                    //Console.WriteLine("Book copy id: " + id);
                    if (!loggedCopyList.Contains(tmp))
                    {
                        Console.WriteLine("Save log");
                        await SecurityAPI.logSecurity(tmp);
                        loggedCopyList.Add(tmp);
                        Console.WriteLine("Added to list");
                        Thread.Sleep(100);
                    }
                }
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {

            uhfPort.WriteLine("#SCAN");
        }

        private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
        {
            // Route.Add("/", (req, res, props) =>
            // {
            //     res.AsText("Hello");
            // });

            // HttpServer.ListenAsync(
            //6969,
            //CancellationToken.None,
            //Route.OnHttpRequestAsync
            //).Wait();
        }

        private async void Form1_Load(object sender, EventArgs e)
        {
            BookListResponse rs = await SecurityAPI.getDeactivatedBooks();
            if (rs.isSuccess)
            {
                Console.WriteLine("=========   Getting deactivated books");
                deactivatedBooks = rs.rfids;
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            uhfPort.WriteLine("#BEP1");
        }
    }
}
