using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 
using System.Windows.Forms;

namespace DropBoxUI
{
    public partial class SetUpForm : Form
    {
        private const string CLOSED_DOOR_MSG = "CLOSED";
        private const string OPENED_DOOR_MSG = "OPENED";
        private const string ACK_MSG = "ACK";

        private bool isFDConnecting = false;
        string[] ports;

        private string portFD;
        private string portBD;

        private string FDmsg = "";

        public SetUpForm()
        {
            InitializeComponent();
        }

        private void SetUpForm_Load(object sender, EventArgs e)
        {
            cbBackDoorPort.DropDownStyle = ComboBoxStyle.DropDownList;
            cbFrontDoorPort.DropDownStyle = ComboBoxStyle.DropDownList;
        }

        private void btnGetAllPort_Click(object sender, EventArgs e)
        {
            cbBackDoorPort.Items.Clear();
            cbFrontDoorPort.Items.Clear();
            ports = SerialPort.GetPortNames();
            foreach (string port in ports)
            {
                cbBackDoorPort.Items.Add(port);
                cbFrontDoorPort.Items.Add(port);
                if (ports[0] != null)
                {
                    cbBackDoorPort.SelectedItem = ports[0];
                    cbFrontDoorPort.SelectedItem = ports[0];
                }
            }


        }

        private void btFDConnect_Click(object sender, EventArgs e)
        {
            if (!isFDConnecting)
            {
                connectToFB();
            }
            else
            {
                disconnectFromFB();
            }
        }


        private void connectToFB()
        {
            string selectedPort = cbFrontDoorPort.GetItemText(cbFrontDoorPort.SelectedItem);
            serialFrontDoor.PortName = selectedPort;
            serialFrontDoor.BaudRate = 9600;
            serialFrontDoor.Parity = Parity.None;
            serialFrontDoor.DataBits = 8;
            serialFrontDoor.StopBits = StopBits.One;

            try
            {
                serialFrontDoor.Open();
                serialFrontDoor.Write("#CONX\n");
                isFDConnecting = true;
        
            }
            catch (Exception e)
            {
            }
            if (isFDConnecting)
            {
               
            }
        }

        private void disconnectFromFB()
        {
            try
            {
                serialFrontDoor.Close();
                isFDConnecting = false;
            }
            catch (Exception e)
            {
                
            }
        }


        private void btFBUp_Click(object sender, EventArgs e)
        {
            if (isFDConnecting)
            {
                serialFrontDoor.Write("#FDOP\n");
            }
        }

        private void btFDDown_Click(object sender, EventArgs e)
        {
            if (isFDConnecting)
            {
                serialFrontDoor.Write("#FDCL\n");
            }
        }

        private void serialFrontDoor_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {

            this.FDmsg = serialFrontDoor.ReadLine();
            Console.WriteLine(this.FDmsg);
            if (this.FDmsg.Contains(ACK_MSG))
            {
            }
            else if(this.FDmsg.Contains(CLOSED_DOOR_MSG))
            {
            }
            else if (this.FDmsg.Contains(OPENED_DOOR_MSG))
            {
            }

        }

        private void btAccess_Click(object sender, EventArgs e)
        {
            ReturnForm returnForm = new ReturnForm(portFD, portBD);
            returnForm.ShowDialog();
        }

        private void btGetPortFrontDoor_Click(object sender, EventArgs e)
        {
            portFD = cbFrontDoorPort.GetItemText(cbFrontDoorPort.SelectedItem);
            //connectToFB();
        }

        private void btnGetPortBD_Click(object sender, EventArgs e)
        {
            portBD = cbBackDoorPort.GetItemText(cbBackDoorPort.SelectedItem);

        }

        private void btClose_Click(object sender, EventArgs e)
        {
            if (isFDConnecting)
            {
                serialFrontDoor.Write("#FDCL\n");
            }
        }

        private void btOpen_Click(object sender, EventArgs e)
        {
            if (isFDConnecting)
            {
                serialFrontDoor.Write("#FDOP\n");
            }
        }
    }
}
