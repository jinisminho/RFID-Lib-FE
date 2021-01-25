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

namespace rfid_security_controller
{
    public partial class Form1 : Form
    {
        bool isConnected = false;
        bool isConnectedUhf = false;
        bool isCooldown = false;
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
            if (!isCooldown)
            {
                GetBorrowedBooks();
                isCooldown = true;
            }
            CheckCooldown();
            string tmp = uhfPort.ReadLine();
            Console.WriteLine(tmp);
            if (books.Contains(tmp))
            {
                arduinoUnoPort.Write("#ALRT\n");
                //AppendTextPlus(txtMessage, GetCurrentTime() + "Alert: Not checked out book detected! (TID:" + tmp + ")\n", Color.Red);
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

        List<string> books = new List<string>();
        private void GetBorrowedBooks()
        {
            Console.WriteLine("============================ Getting from DB");
            MyDbConnection myDb = new MyDbConnection();
            books = myDb.GetBorrowedBooks();
        }

        private String GetCurrentTime()
        {
            return DateTime.Parse(DateTime.Now.ToString()).ToString("HH:mm:ss") + ": ";
        }

    }
}
