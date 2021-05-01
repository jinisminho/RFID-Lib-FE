
namespace rfid_security_controller
{
    partial class Form1
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.cbPorts = new System.Windows.Forms.ComboBox();
            this.btnConnectSerialPort = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.chbLed3 = new System.Windows.Forms.CheckBox();
            this.chbLed1 = new System.Windows.Forms.CheckBox();
            this.chbLed2 = new System.Windows.Forms.CheckBox();
            this.arduinoUnoPort = new System.IO.Ports.SerialPort(this.components);
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.cbUhfPorts = new System.Windows.Forms.ComboBox();
            this.btnConnectUhf = new System.Windows.Forms.Button();
            this.uhfPort = new System.IO.Ports.SerialPort(this.components);
            this.txtMessage = new System.Windows.Forms.RichTextBox();
            this.lblNotConnectAlarm = new System.Windows.Forms.Label();
            this.lblNotConnectScanner = new System.Windows.Forms.Label();
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.button1 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            this.btnBeep = new System.Windows.Forms.Button();
            this.lbRLMS = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.btnGetPorts = new System.Windows.Forms.Button();
            this.groupBox2.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.cbPorts);
            this.groupBox2.Controls.Add(this.btnConnectSerialPort);
            this.groupBox2.Location = new System.Drawing.Point(6, 102);
            this.groupBox2.Margin = new System.Windows.Forms.Padding(2);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Padding = new System.Windows.Forms.Padding(2);
            this.groupBox2.Size = new System.Drawing.Size(221, 58);
            this.groupBox2.TabIndex = 12;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Alarm Connection";
            // 
            // cbPorts
            // 
            this.cbPorts.FormattingEnabled = true;
            this.cbPorts.Location = new System.Drawing.Point(112, 30);
            this.cbPorts.Margin = new System.Windows.Forms.Padding(2);
            this.cbPorts.Name = "cbPorts";
            this.cbPorts.Size = new System.Drawing.Size(71, 21);
            this.cbPorts.TabIndex = 1;
            // 
            // btnConnectSerialPort
            // 
            this.btnConnectSerialPort.Location = new System.Drawing.Point(6, 25);
            this.btnConnectSerialPort.Margin = new System.Windows.Forms.Padding(2);
            this.btnConnectSerialPort.Name = "btnConnectSerialPort";
            this.btnConnectSerialPort.Size = new System.Drawing.Size(102, 28);
            this.btnConnectSerialPort.TabIndex = 0;
            this.btnConnectSerialPort.Text = "Connect";
            this.btnConnectSerialPort.UseVisualStyleBackColor = true;
            this.btnConnectSerialPort.Click += new System.EventHandler(this.btnConnectSerialPort_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.chbLed3);
            this.groupBox1.Controls.Add(this.chbLed1);
            this.groupBox1.Controls.Add(this.chbLed2);
            this.groupBox1.Location = new System.Drawing.Point(12, 11);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(2);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(2);
            this.groupBox1.Size = new System.Drawing.Size(215, 68);
            this.groupBox1.TabIndex = 11;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "LED Control";
            this.groupBox1.Visible = false;
            // 
            // chbLed3
            // 
            this.chbLed3.AutoSize = true;
            this.chbLed3.Location = new System.Drawing.Point(162, 29);
            this.chbLed3.Margin = new System.Windows.Forms.Padding(2);
            this.chbLed3.Name = "chbLed3";
            this.chbLed3.Size = new System.Drawing.Size(53, 17);
            this.chbLed3.TabIndex = 7;
            this.chbLed3.Text = "LED3";
            this.chbLed3.UseVisualStyleBackColor = true;
            this.chbLed3.Visible = false;
            // 
            // chbLed1
            // 
            this.chbLed1.AutoSize = true;
            this.chbLed1.Location = new System.Drawing.Point(9, 29);
            this.chbLed1.Margin = new System.Windows.Forms.Padding(2);
            this.chbLed1.Name = "chbLed1";
            this.chbLed1.Size = new System.Drawing.Size(53, 17);
            this.chbLed1.TabIndex = 5;
            this.chbLed1.Text = "LED1";
            this.chbLed1.UseVisualStyleBackColor = true;
            this.chbLed1.Visible = false;
            this.chbLed1.CheckedChanged += new System.EventHandler(this.chbLed1_CheckedChanged);
            // 
            // chbLed2
            // 
            this.chbLed2.AutoSize = true;
            this.chbLed2.Location = new System.Drawing.Point(79, 29);
            this.chbLed2.Margin = new System.Windows.Forms.Padding(2);
            this.chbLed2.Name = "chbLed2";
            this.chbLed2.Size = new System.Drawing.Size(53, 17);
            this.chbLed2.TabIndex = 6;
            this.chbLed2.Text = "LED2";
            this.chbLed2.UseVisualStyleBackColor = true;
            this.chbLed2.Visible = false;
            // 
            // arduinoUnoPort
            // 
            this.arduinoUnoPort.DataReceived += new System.IO.Ports.SerialDataReceivedEventHandler(this.arduinoUnoPort_DataReceived);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.cbUhfPorts);
            this.groupBox3.Controls.Add(this.btnConnectUhf);
            this.groupBox3.Location = new System.Drawing.Point(272, 102);
            this.groupBox3.Margin = new System.Windows.Forms.Padding(2);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Padding = new System.Windows.Forms.Padding(2);
            this.groupBox3.Size = new System.Drawing.Size(221, 58);
            this.groupBox3.TabIndex = 16;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "UHF Connection";
            // 
            // cbUhfPorts
            // 
            this.cbUhfPorts.FormattingEnabled = true;
            this.cbUhfPorts.Location = new System.Drawing.Point(112, 30);
            this.cbUhfPorts.Margin = new System.Windows.Forms.Padding(2);
            this.cbUhfPorts.Name = "cbUhfPorts";
            this.cbUhfPorts.Size = new System.Drawing.Size(71, 21);
            this.cbUhfPorts.TabIndex = 1;
            // 
            // btnConnectUhf
            // 
            this.btnConnectUhf.Location = new System.Drawing.Point(6, 25);
            this.btnConnectUhf.Margin = new System.Windows.Forms.Padding(2);
            this.btnConnectUhf.Name = "btnConnectUhf";
            this.btnConnectUhf.Size = new System.Drawing.Size(102, 28);
            this.btnConnectUhf.TabIndex = 0;
            this.btnConnectUhf.Text = "Connect";
            this.btnConnectUhf.UseVisualStyleBackColor = true;
            this.btnConnectUhf.Click += new System.EventHandler(this.btnConnectUhf_Click);
            // 
            // uhfPort
            // 
            this.uhfPort.DataReceived += new System.IO.Ports.SerialDataReceivedEventHandler(this.uhfPort_DataReceived);
            // 
            // txtMessage
            // 
            this.txtMessage.ForeColor = System.Drawing.SystemColors.HotTrack;
            this.txtMessage.Location = new System.Drawing.Point(12, 234);
            this.txtMessage.Name = "txtMessage";
            this.txtMessage.ReadOnly = true;
            this.txtMessage.Size = new System.Drawing.Size(645, 82);
            this.txtMessage.TabIndex = 17;
            this.txtMessage.Text = "";
            // 
            // lblNotConnectAlarm
            // 
            this.lblNotConnectAlarm.AutoSize = true;
            this.lblNotConnectAlarm.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblNotConnectAlarm.ForeColor = System.Drawing.Color.Red;
            this.lblNotConnectAlarm.Location = new System.Drawing.Point(12, 166);
            this.lblNotConnectAlarm.Name = "lblNotConnectAlarm";
            this.lblNotConnectAlarm.Size = new System.Drawing.Size(309, 20);
            this.lblNotConnectAlarm.TabIndex = 18;
            this.lblNotConnectAlarm.Text = "- You are not connected to the alarm!";
            // 
            // lblNotConnectScanner
            // 
            this.lblNotConnectScanner.AutoSize = true;
            this.lblNotConnectScanner.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblNotConnectScanner.ForeColor = System.Drawing.Color.Red;
            this.lblNotConnectScanner.Location = new System.Drawing.Point(12, 196);
            this.lblNotConnectScanner.Name = "lblNotConnectScanner";
            this.lblNotConnectScanner.Size = new System.Drawing.Size(329, 20);
            this.lblNotConnectScanner.TabIndex = 19;
            this.lblNotConnectScanner.Text = "- You are not connected to the scanner!";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(350, 34);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 20;
            this.button1.Text = "button1";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Visible = false;
            this.button1.Click += new System.EventHandler(this.button1_Click_1);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(423, 74);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(75, 23);
            this.button2.TabIndex = 21;
            this.button2.Text = "button2";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Visible = false;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // btnBeep
            // 
            this.btnBeep.Location = new System.Drawing.Point(265, 74);
            this.btnBeep.Name = "btnBeep";
            this.btnBeep.Size = new System.Drawing.Size(75, 23);
            this.btnBeep.TabIndex = 22;
            this.btnBeep.Text = "beep";
            this.btnBeep.UseVisualStyleBackColor = true;
            this.btnBeep.Visible = false;
            this.btnBeep.Click += new System.EventHandler(this.button3_Click);
            // 
            // lbRLMS
            // 
            this.lbRLMS.AutoSize = true;
            this.lbRLMS.Font = new System.Drawing.Font("Century", 36F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbRLMS.Location = new System.Drawing.Point(177, 3);
            this.lbRLMS.Name = "lbRLMS";
            this.lbRLMS.Size = new System.Drawing.Size(167, 57);
            this.lbRLMS.TabIndex = 23;
            this.lbRLMS.Text = "RLMS";
            this.lbRLMS.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Century", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(111, 59);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(300, 38);
            this.label1.TabIndex = 24;
            this.label1.Text = "Security Controller";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnGetPorts
            // 
            this.btnGetPorts.Location = new System.Drawing.Point(530, 127);
            this.btnGetPorts.Name = "btnGetPorts";
            this.btnGetPorts.Size = new System.Drawing.Size(75, 23);
            this.btnGetPorts.TabIndex = 25;
            this.btnGetPorts.Text = "Get ports";
            this.btnGetPorts.UseVisualStyleBackColor = true;
            this.btnGetPorts.Click += new System.EventHandler(this.btnGetPorts_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(669, 328);
            this.Controls.Add(this.btnGetPorts);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.lbRLMS);
            this.Controls.Add(this.btnBeep);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.lblNotConnectScanner);
            this.Controls.Add(this.lblNotConnectAlarm);
            this.Controls.Add(this.txtMessage);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.groupBox2.ResumeLayout(false);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.ComboBox cbPorts;
        private System.Windows.Forms.Button btnConnectSerialPort;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.CheckBox chbLed3;
        private System.Windows.Forms.CheckBox chbLed1;
        private System.Windows.Forms.CheckBox chbLed2;
        private System.IO.Ports.SerialPort arduinoUnoPort;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.ComboBox cbUhfPorts;
        private System.Windows.Forms.Button btnConnectUhf;
        private System.IO.Ports.SerialPort uhfPort;
        private System.Windows.Forms.RichTextBox txtMessage;
        private System.Windows.Forms.Label lblNotConnectAlarm;
        private System.Windows.Forms.Label lblNotConnectScanner;
        private System.Windows.Forms.ColorDialog colorDialog1;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button button2;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
        private System.Windows.Forms.Button btnBeep;
        private System.Windows.Forms.Label lbRLMS;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btnGetPorts;
    }
}

