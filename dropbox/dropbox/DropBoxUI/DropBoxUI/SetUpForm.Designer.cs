namespace DropBoxUI
{
    partial class SetUpForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(SetUpForm));
            this.serialFrontDoor = new System.IO.Ports.SerialPort(this.components);
            this.serialBackDoor = new System.IO.Ports.SerialPort(this.components);
            this.serialUHF = new System.IO.Ports.SerialPort(this.components);
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.panel3 = new System.Windows.Forms.Panel();
            this.btnGetPortBD = new System.Windows.Forms.Button();
            this.label5 = new System.Windows.Forms.Label();
            this.cbBackDoorPort = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btGetPortFrontDoor = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.cbFrontDoorPort = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.btnGetAllPort = new System.Windows.Forms.Button();
            this.pnRight = new System.Windows.Forms.Panel();
            this.btAccess = new System.Windows.Forms.Button();
            this.btClose = new System.Windows.Forms.Button();
            this.btOpen = new System.Windows.Forms.Button();
            this.panel3.SuspendLayout();
            this.panel1.SuspendLayout();
            this.pnRight.SuspendLayout();
            this.SuspendLayout();
            // 
            // serialFrontDoor
            // 
            this.serialFrontDoor.DataReceived += new System.IO.Ports.SerialDataReceivedEventHandler(this.serialFrontDoor_DataReceived);
            // 
            // panel3
            // 
            this.panel3.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel3.Controls.Add(this.btnGetPortBD);
            this.panel3.Controls.Add(this.label5);
            this.panel3.Controls.Add(this.cbBackDoorPort);
            this.panel3.Controls.Add(this.label2);
            this.panel3.Location = new System.Drawing.Point(3, 103);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(475, 100);
            this.panel3.TabIndex = 2;
            // 
            // btnGetPortBD
            // 
            this.btnGetPortBD.Location = new System.Drawing.Point(218, 49);
            this.btnGetPortBD.Name = "btnGetPortBD";
            this.btnGetPortBD.Size = new System.Drawing.Size(91, 27);
            this.btnGetPortBD.TabIndex = 4;
            this.btnGetPortBD.Text = "Get Port";
            this.btnGetPortBD.UseVisualStyleBackColor = true;
            this.btnGetPortBD.Click += new System.EventHandler(this.btnGetPortBD_Click);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(25, 55);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(38, 17);
            this.label5.TabIndex = 3;
            this.label5.Text = "Port:";
            // 
            // cbBackDoorPort
            // 
            this.cbBackDoorPort.FormattingEnabled = true;
            this.cbBackDoorPort.Location = new System.Drawing.Point(67, 52);
            this.cbBackDoorPort.Name = "cbBackDoorPort";
            this.cbBackDoorPort.Size = new System.Drawing.Size(121, 24);
            this.cbBackDoorPort.TabIndex = 1;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(25, 20);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(74, 17);
            this.label2.TabIndex = 0;
            this.label2.Text = "Back Door";
            // 
            // panel1
            // 
            this.panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel1.Controls.Add(this.btOpen);
            this.panel1.Controls.Add(this.btClose);
            this.panel1.Controls.Add(this.btGetPortFrontDoor);
            this.panel1.Controls.Add(this.label4);
            this.panel1.Controls.Add(this.cbFrontDoorPort);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Location = new System.Drawing.Point(3, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(475, 100);
            this.panel1.TabIndex = 0;
            // 
            // btGetPortFrontDoor
            // 
            this.btGetPortFrontDoor.Location = new System.Drawing.Point(218, 47);
            this.btGetPortFrontDoor.Name = "btGetPortFrontDoor";
            this.btGetPortFrontDoor.Size = new System.Drawing.Size(91, 26);
            this.btGetPortFrontDoor.TabIndex = 3;
            this.btGetPortFrontDoor.Text = "Get Port";
            this.btGetPortFrontDoor.UseVisualStyleBackColor = true;
            this.btGetPortFrontDoor.Click += new System.EventHandler(this.btGetPortFrontDoor_Click);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(25, 50);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(38, 17);
            this.label4.TabIndex = 2;
            this.label4.Text = "Port:";
            // 
            // cbFrontDoorPort
            // 
            this.cbFrontDoorPort.FormattingEnabled = true;
            this.cbFrontDoorPort.Location = new System.Drawing.Point(67, 47);
            this.cbFrontDoorPort.Name = "cbFrontDoorPort";
            this.cbFrontDoorPort.Size = new System.Drawing.Size(121, 24);
            this.cbFrontDoorPort.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(22, 12);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(76, 17);
            this.label1.TabIndex = 0;
            this.label1.Text = "Front Door";
            // 
            // btnGetAllPort
            // 
            this.btnGetAllPort.Location = new System.Drawing.Point(3, 208);
            this.btnGetAllPort.Name = "btnGetAllPort";
            this.btnGetAllPort.Size = new System.Drawing.Size(475, 37);
            this.btnGetAllPort.TabIndex = 4;
            this.btnGetAllPort.Text = "GET PORTS";
            this.btnGetAllPort.UseVisualStyleBackColor = true;
            this.btnGetAllPort.Click += new System.EventHandler(this.btnGetAllPort_Click);
            // 
            // pnRight
            // 
            this.pnRight.Controls.Add(this.btAccess);
            this.pnRight.Controls.Add(this.btnGetAllPort);
            this.pnRight.Controls.Add(this.panel1);
            this.pnRight.Controls.Add(this.panel3);
            this.pnRight.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnRight.Location = new System.Drawing.Point(0, 0);
            this.pnRight.Name = "pnRight";
            this.pnRight.Size = new System.Drawing.Size(481, 295);
            this.pnRight.TabIndex = 4;
            // 
            // btAccess
            // 
            this.btAccess.Location = new System.Drawing.Point(4, 250);
            this.btAccess.Name = "btAccess";
            this.btAccess.Size = new System.Drawing.Size(475, 37);
            this.btAccess.TabIndex = 5;
            this.btAccess.Text = "ACCESS";
            this.btAccess.UseVisualStyleBackColor = true;
            this.btAccess.Click += new System.EventHandler(this.btAccess_Click);
            // 
            // btClose
            // 
            this.btClose.Location = new System.Drawing.Point(378, 12);
            this.btClose.Name = "btClose";
            this.btClose.Size = new System.Drawing.Size(75, 23);
            this.btClose.TabIndex = 4;
            this.btClose.Text = "close";
            this.btClose.UseVisualStyleBackColor = true;
            this.btClose.Click += new System.EventHandler(this.btClose_Click);
            // 
            // btOpen
            // 
            this.btOpen.Location = new System.Drawing.Point(378, 49);
            this.btOpen.Name = "btOpen";
            this.btOpen.Size = new System.Drawing.Size(75, 23);
            this.btOpen.TabIndex = 5;
            this.btOpen.Text = "open";
            this.btOpen.UseVisualStyleBackColor = true;
            this.btOpen.Click += new System.EventHandler(this.btOpen_Click);
            // 
            // SetUpForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(481, 295);
            this.Controls.Add(this.pnRight);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "SetUpForm";
            this.Text = "BOOK DROP SET UP CONNECTION";
            this.Load += new System.EventHandler(this.SetUpForm_Load);
            this.panel3.ResumeLayout(false);
            this.panel3.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.pnRight.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion
        private System.IO.Ports.SerialPort serialFrontDoor;
        private System.IO.Ports.SerialPort serialBackDoor;
        private System.IO.Ports.SerialPort serialUHF;
        private System.Windows.Forms.ColorDialog colorDialog1;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ComboBox cbBackDoorPort;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.ComboBox cbFrontDoorPort;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btnGetAllPort;
        private System.Windows.Forms.Panel pnRight;
        private System.Windows.Forms.Button btAccess;
        private System.Windows.Forms.Button btnGetPortBD;
        private System.Windows.Forms.Button btGetPortFrontDoor;
        private System.Windows.Forms.Button btOpen;
        private System.Windows.Forms.Button btClose;
    }
}

