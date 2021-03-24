using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using DropBoxUI.Models;
using DropBoxUI.Processors;
using DropBoxUI.Utils;

namespace DropBoxUI
{
    public partial class ReturnForm : Form
    {

        enum DoorStatus {
             FRONT_OPENED,
             FRONT_OPENING,
             FRONT_CLOSED,
             FRONT_CLOSING,
             BACK_OPENED,
             BACK_OPENING,
             BACK_CLOSED,
             BACK_CLOSING,
        }

        enum BookStatus
        {
            RETURNED,
            INVALID,
            OVERDUE
        }

        enum ProcessStatus
        {
            START,
            ERROR,
            RETURNED,
            RESET,
            ERROR_NO_BOOK
        }

        enum ButtonText
        {
            START,
            DONE
        }

        private ProcessStatus processStatus;
        private string portFont;
        private string portBack;
        private string fontMsg;
        private string backMsg;

        private DoorStatus frontDoorStatus = DoorStatus.FRONT_CLOSED;
        private DoorStatus backDoorStatus = DoorStatus.BACK_CLOSED;

        private int sesionTime;
        private string bookRfid;
        private int numberOfBookScanned = 0;

        private IDictionary<String, String> bookCodeMap;


        public ReturnForm(string portFont, string portBack)
        {
            InitializeComponent();
            this.portFont = portFont;
            this.portBack = portBack;

        }

        private void ReturnForm_Load(object sender, EventArgs e)
        {
            this.TopMost = true;
            this.FormBorderStyle = FormBorderStyle.None;
            this.WindowState = FormWindowState.Maximized;
            txtBookRfid.Hide();
            connectToSerialPortBackDoor(portBack);
            connectToSerialPortFrontDoor(portFont);
            Console.WriteLine("---------------- load");
            bookCodeMap = new Dictionary<String, String>();
            resetState();
            int x = (panel1.Width - picTitle.Width) / 2;
            picTitle.Location = new Point(x, picTitle.Location.Y);
        }


        private void connectToSerialPortFrontDoor(string portName)
        {
            try
            {
                serialFrontDoor.PortName = portName;
                serialFrontDoor.BaudRate = 9600;
                serialFrontDoor.Parity = Parity.None;
                serialFrontDoor.DataBits = 8;
                serialFrontDoor.StopBits = StopBits.One;
                serialFrontDoor.Open();
                serialFrontDoor.Write("#CONX\n");
                Console.Write("connect to fd port: " + portName);
            }
            catch (Exception e)
            {
                txtMessage.ForeColor = Color.Red;
                txtMessage.Text = e.Message;
            }
        }

        private void connectToSerialPortBackDoor(string portName)
        {
            try
            {
                serialBackDoor.PortName = portName;
                serialBackDoor.BaudRate = 9600;
                serialBackDoor.Parity = Parity.None;
                serialBackDoor.DataBits = 8;
                serialBackDoor.StopBits = StopBits.One;
                serialBackDoor.Open();
                serialBackDoor.Write("#CONX\n");
                Console.Write("connect to bd port: " + portName);
            }
            catch (Exception e)
            {
                txtMessage.ForeColor = Color.Red;
                txtMessage.Text = e.Message;
            }
        }



        private void timerSession_Tick(object sender, EventArgs e) 
        {
            sesionTime -= 1;
            lbsession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            if (sesionTime == 0)
            {
                
                
                    timerSession.Stop();
                    timerSession.Enabled = false;
                    resetState();
                
            }
        }

        private void resetState()
        {
            pnFlow.Controls.Clear();
            frontDoorStatus = DoorStatus.FRONT_CLOSED;
            backDoorStatus = DoorStatus.BACK_CLOSED;
            timerSession.Enabled = false;
            timerCountBook.Enabled = false;
            //timerWaitCloseDoor.Enabled = false;
            //timerResetSuccess.Enabled = false;
            sesionTime = Constant.PROCESS_SESSION_TIME_OUT;
            lbsession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            spiner.Hide();
            txtBookRfid.Text = "";
            txtBookRfid.Enabled = false;
            numberOfBookScanned = 0;
            bookRfid = "";
            btStart.Enabled = true;
            btStart.Text = ButtonText.START.ToString();
            txtMessage.ForeColor = Color.Black;
            txtMessage.Text = "Please click on start button to begin/open the door";
            lbsession.Hide();
            processStatus = ProcessStatus.RESET;
            lbNumber.Text = "";
            bookCodeMap.Clear();

        }

        private async void callReturnAPI()
        {
            timerSession.Enabled = false;
            spiner.Show();
            ReturnResponseModel rs = await BookProcessor.returnBook(bookRfid);
            if (rs.isSuccess)
            {
                await EmailProcessor.emailReturn(rs.book);
            }
            spiner.Hide();
            timerSession.Enabled = true;
            if (rs.isSuccess)
            {
                if (rs.book.status.Contains(BookStatus.RETURNED.ToString()))
                {
                    processStatus = ProcessStatus.RETURNED;
                    btStart.Text = ButtonText.DONE.ToString();
                    btStart.Enabled = true;
                    txtMessage.ForeColor = Color.Green;
                    txtMessage.Text = "Returned item";
                    txtBookRfid.Enabled = false;
                    openBackDoor();
                }
                else if (rs.book.status.Contains(BookStatus.OVERDUE.ToString()))
                {
                    processStatus = ProcessStatus.ERROR;
                    txtMessage.ForeColor = Color.Red;
                    txtMessage.Text = "Return failed. Please take you book out and return at libarian counter as overdue. " +
                        "The door wil close in few second.";
                    txtBookRfid.Enabled = false;
                    openFrontDoor();
                }
                else if (rs.book.status.Contains(BookStatus.INVALID.ToString()))
                {
                    processStatus = ProcessStatus.ERROR;
                    txtMessage.ForeColor = Color.Red;
                    txtMessage.Text = "Return failed. This book hasn't borrowed yet. Please take it out and contact the libarian. " +
                        "The door wil close in few second.";
                    txtBookRfid.Enabled = false;
                    openFrontDoor();
                }
                BookReturnItem item = new BookReturnItem(rs.book);
                item.Width = pnFlow.Width - 10;
                pnFlow.Controls.Add(item);
            }
            else
            {
                processStatus = ProcessStatus.ERROR;
                txtMessage.ForeColor = Color.Red;
                txtMessage.Text = "Return failed. Please take the item out and contact the libarian. " +
                       "The door wil close in few second.";
                txtBookRfid.Enabled = false;
                openFrontDoor();
            }

        }

        private void txtBookRfid_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Enter)
            {
                txtBookRfid.Enabled = false;
                bookRfid = txtBookRfid.Text.Trim();
                if(bookRfid.Length == Constant.TID_LENGTH)
                {
                    if (!bookCodeMap.ContainsKey(bookRfid))
                    {
                        numberOfBookScanned++;
                        try
                        {
                            bookCodeMap.Add(bookRfid, bookRfid);
                        }
                        catch (Exception)
                        {
                        }
                    }
                }
                else
                {
                    processStatus = ProcessStatus.ERROR;
                    timerCountBook.Enabled = false;
                    txtMessage.ForeColor = Color.Red;
                    txtMessage.Text = "Invalid item. Please take it out. The door will closed in few second.";
                    txtBookRfid.Enabled = false;
                    openFrontDoor();
                }
                txtBookRfid.Text = "";
                txtBookRfid.Enabled = true;
                txtBookRfid.Focus();
            }
        }

        //call when close front door to scan
        private void timerCountBook_Tick(object sender, EventArgs e)
        {
            timerCountBook.Stop();
            timerCountBook.Enabled = false;
            txtBookRfid.Text = "";
            txtBookRfid.Enabled = false;
            if (numberOfBookScanned < 1)
            {
                txtMessage.ForeColor = Color.Red;
                txtMessage.Text = "There is no item. The system will cancel automatically.";
                txtBookRfid.Enabled = false;
                var t = new Timer();
                t.Interval = 4000;
                t.Tick += (s, d) =>
                {
                    resetState();
                    t.Stop();
                };
                t.Start();
                
            }
            else if (numberOfBookScanned > 1)
            {
                txtMessage.ForeColor = Color.Red;
                txtMessage.Text = "Only one 1 item each transaction. Please take your items out. The door will close in few second.";
                txtBookRfid.Enabled = false;
                processStatus = ProcessStatus.ERROR;
                openFrontDoor();
            }
            else
            {
                callReturnAPI();
            }

        }

        //bat dau tu day
        private  void btStart_Click(object sender, EventArgs e)
        {
            if(btStart.Text == ButtonText.START.ToString())
            {
                lbsession.Show();
                timerSession.Enabled = true;
                btStart.Enabled = false;
                processStatus = ProcessStatus.START;
                txtMessage.ForeColor = Color.Black;
                txtMessage.Text =  "Please put only 1 book. The door will close in few second.";
                openFrontDoor();
            }
            else if (btStart.Text == ButtonText.DONE.ToString())
            {
                resetState();
            }
        }

        private void openFrontDoor()
        {
            if (serialFrontDoor.IsOpen)
            {
                Console.WriteLine("Open Front Door");
                serialFrontDoor.Write(ArduinoMessage.RQ_FONT_OPEN);
                frontDoorStatus = DoorStatus.FRONT_OPENING;
            }
            timerWaitCloseDoor.Enabled = true;
        }

        private void openBackDoor()
        {
            if (serialBackDoor.IsOpen)
            {
                serialBackDoor.Write(ArduinoMessage.RQ_BACK_OPEN);
                backDoorStatus = DoorStatus.BACK_OPENING;
            }
            timerResetSuccess.Enabled = true;
            
        }

        private void enableScanner()
        {
            txtMessage.ForeColor = Color.Black;
            txtMessage.Text = "Scanning...";
            txtBookRfid.Text = "";
            txtBookRfid.Enabled = true;
            txtBookRfid.Focus();
        }

        private void timerWaitCloseDoor_Tick(object sender, EventArgs e)
        {
            timerWaitCloseDoor.Enabled = false;
            frontDoorStatus = DoorStatus.FRONT_CLOSED;
            if (processStatus == ProcessStatus.START)
            {
                enableScanner();
                timerCountBook.Enabled = true;
            }
            else if (processStatus == ProcessStatus.ERROR)
            {
                resetState();
            }
        }

        private void timerResetSuccess_Tick(object sender, EventArgs e)
        {
            timerResetSuccess.Enabled = false;
            resetState();
        }
    }
}
