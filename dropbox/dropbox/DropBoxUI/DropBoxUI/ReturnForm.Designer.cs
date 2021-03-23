namespace DropBoxUI
{
    partial class ReturnForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ReturnForm));
            this.panel1 = new System.Windows.Forms.Panel();
            this.lbNumber = new System.Windows.Forms.Label();
            this.txtBookRfid = new System.Windows.Forms.TextBox();
            this.panel2 = new System.Windows.Forms.Panel();
            this.pnMessage = new System.Windows.Forms.Panel();
            this.panel3 = new System.Windows.Forms.Panel();
            this.txtMessage = new System.Windows.Forms.RichTextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.pnFlow = new System.Windows.Forms.FlowLayoutPanel();
            this.pbBottom = new System.Windows.Forms.Panel();
            this.btStart = new System.Windows.Forms.Button();
            this.lbsession = new System.Windows.Forms.Label();
            this.serialFrontDoor = new System.IO.Ports.SerialPort(this.components);
            this.serialBackDoor = new System.IO.Ports.SerialPort(this.components);
            this.timerSession = new System.Windows.Forms.Timer(this.components);
            this.timerCountBook = new System.Windows.Forms.Timer(this.components);
            this.timerWaitCloseDoor = new System.Windows.Forms.Timer(this.components);
            this.timerResetSuccess = new System.Windows.Forms.Timer(this.components);
            this.spiner = new System.Windows.Forms.PictureBox();
            this.picTitle = new System.Windows.Forms.PictureBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.pnMessage.SuspendLayout();
            this.panel3.SuspendLayout();
            this.pbBottom.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spiner)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.picTitle)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Controls.Add(this.picTitle);
            this.panel1.Controls.Add(this.lbNumber);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1778, 208);
            this.panel1.TabIndex = 9;
            // 
            // lbNumber
            // 
            this.lbNumber.AutoSize = true;
            this.lbNumber.Location = new System.Drawing.Point(32, 97);
            this.lbNumber.Name = "lbNumber";
            this.lbNumber.Size = new System.Drawing.Size(12, 17);
            this.lbNumber.TabIndex = 7;
            this.lbNumber.Text = " ";
            // 
            // txtBookRfid
            // 
            this.txtBookRfid.Location = new System.Drawing.Point(760, 274);
            this.txtBookRfid.Name = "txtBookRfid";
            this.txtBookRfid.Size = new System.Drawing.Size(281, 22);
            this.txtBookRfid.TabIndex = 0;
            this.txtBookRfid.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtBookRfid_KeyDown);
            // 
            // panel2
            // 
            this.panel2.BackColor = System.Drawing.Color.White;
            this.panel2.Controls.Add(this.pnMessage);
            this.panel2.Controls.Add(this.spiner);
            this.panel2.Controls.Add(this.txtBookRfid);
            this.panel2.Controls.Add(this.pnFlow);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(0, 208);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(1778, 721);
            this.panel2.TabIndex = 10;
            // 
            // pnMessage
            // 
            this.pnMessage.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnMessage.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.pnMessage.Controls.Add(this.panel3);
            this.pnMessage.Controls.Add(this.label1);
            this.pnMessage.Location = new System.Drawing.Point(31, 488);
            this.pnMessage.Name = "pnMessage";
            this.pnMessage.Size = new System.Drawing.Size(1710, 127);
            this.pnMessage.TabIndex = 1;
            // 
            // panel3
            // 
            this.panel3.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.panel3.BackColor = System.Drawing.Color.White;
            this.panel3.Controls.Add(this.txtMessage);
            this.panel3.Location = new System.Drawing.Point(4, 37);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(1703, 87);
            this.panel3.TabIndex = 1;
            // 
            // txtMessage
            // 
            this.txtMessage.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.txtMessage.BackColor = System.Drawing.Color.White;
            this.txtMessage.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtMessage.Font = new System.Drawing.Font("Calibri", 13.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.txtMessage.Location = new System.Drawing.Point(12, 7);
            this.txtMessage.Name = "txtMessage";
            this.txtMessage.ReadOnly = true;
            this.txtMessage.Size = new System.Drawing.Size(1678, 73);
            this.txtMessage.TabIndex = 1;
            this.txtMessage.TabStop = false;
            this.txtMessage.Text = "";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Calibri", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.label1.ForeColor = System.Drawing.Color.White;
            this.label1.Location = new System.Drawing.Point(11, 5);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(108, 29);
            this.label1.TabIndex = 0;
            this.label1.Text = "Message:";
            // 
            // pnFlow
            // 
            this.pnFlow.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)));
            this.pnFlow.Location = new System.Drawing.Point(31, 22);
            this.pnFlow.Name = "pnFlow";
            this.pnFlow.Size = new System.Drawing.Size(1710, 204);
            this.pnFlow.TabIndex = 0;
            // 
            // pbBottom
            // 
            this.pbBottom.Controls.Add(this.btStart);
            this.pbBottom.Controls.Add(this.lbsession);
            this.pbBottom.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.pbBottom.Location = new System.Drawing.Point(0, 829);
            this.pbBottom.Name = "pbBottom";
            this.pbBottom.Size = new System.Drawing.Size(1778, 100);
            this.pbBottom.TabIndex = 11;
            // 
            // btStart
            // 
            this.btStart.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btStart.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.btStart.FlatAppearance.BorderSize = 0;
            this.btStart.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btStart.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.btStart.ForeColor = System.Drawing.Color.White;
            this.btStart.Location = new System.Drawing.Point(1611, 25);
            this.btStart.Name = "btStart";
            this.btStart.Size = new System.Drawing.Size(130, 37);
            this.btStart.TabIndex = 9;
            this.btStart.TabStop = false;
            this.btStart.Text = "START";
            this.btStart.UseMnemonic = false;
            this.btStart.UseVisualStyleBackColor = false;
            this.btStart.Click += new System.EventHandler(this.btStart_Click);
            // 
            // lbsession
            // 
            this.lbsession.AutoSize = true;
            this.lbsession.Font = new System.Drawing.Font("Calibri", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbsession.ForeColor = System.Drawing.Color.Firebrick;
            this.lbsession.Location = new System.Drawing.Point(25, 25);
            this.lbsession.Name = "lbsession";
            this.lbsession.Size = new System.Drawing.Size(397, 49);
            this.lbsession.TabIndex = 11;
            this.lbsession.Text = "SESSION TIMEOUT: 60 ";
            // 
            // timerSession
            // 
            this.timerSession.Interval = 1000;
            this.timerSession.Tick += new System.EventHandler(this.timerSession_Tick);
            // 
            // timerCountBook
            // 
            this.timerCountBook.Interval = 10000;
            this.timerCountBook.Tick += new System.EventHandler(this.timerCountBook_Tick);
            // 
            // timerWaitCloseDoor
            // 
            this.timerWaitCloseDoor.Interval = 14000;
            this.timerWaitCloseDoor.Tick += new System.EventHandler(this.timerWaitCloseDoor_Tick);
            // 
            // timerResetSuccess
            // 
            this.timerResetSuccess.Interval = 10000;
            this.timerResetSuccess.Tick += new System.EventHandler(this.timerResetSuccess_Tick);
            // 
            // spiner
            // 
            this.spiner.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.spiner.Image = global::DropBoxUI.Properties.Resources.Spinner_trans__1_;
            this.spiner.Location = new System.Drawing.Point(842, 324);
            this.spiner.Name = "spiner";
            this.spiner.Size = new System.Drawing.Size(101, 71);
            this.spiner.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.spiner.TabIndex = 6;
            this.spiner.TabStop = false;
            // 
            // picTitle
            // 
            this.picTitle.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.picTitle.Image = global::DropBoxUI.Properties.Resources.book_drop_station;
            this.picTitle.Location = new System.Drawing.Point(0, 66);
            this.picTitle.Name = "picTitle";
            this.picTitle.Size = new System.Drawing.Size(1775, 69);
            this.picTitle.SizeMode = System.Windows.Forms.PictureBoxSizeMode.CenterImage;
            this.picTitle.TabIndex = 9;
            this.picTitle.TabStop = false;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::DropBoxUI.Properties.Resources.logo_dark_bcg;
            this.pictureBox1.Location = new System.Drawing.Point(21, 41);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(237, 111);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 8;
            this.pictureBox1.TabStop = false;
            // 
            // ReturnForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(1778, 929);
            this.Controls.Add(this.pbBottom);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.panel1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "ReturnForm";
            this.Text = "BOOK DROP";
            this.Load += new System.EventHandler(this.ReturnForm_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.pnMessage.ResumeLayout(false);
            this.pnMessage.PerformLayout();
            this.panel3.ResumeLayout(false);
            this.pbBottom.ResumeLayout(false);
            this.pbBottom.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spiner)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.picTitle)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Panel pbBottom;
        private System.Windows.Forms.Button btStart;
        private System.Windows.Forms.Label lbsession;
        private System.IO.Ports.SerialPort serialFrontDoor;
        private System.IO.Ports.SerialPort serialBackDoor;
        private System.Windows.Forms.Timer timerSession;
        private System.Windows.Forms.TextBox txtBookRfid;
        private System.Windows.Forms.Timer timerCountBook;
        private System.Windows.Forms.PictureBox spiner;
        private System.Windows.Forms.FlowLayoutPanel pnFlow;
        private System.Windows.Forms.Panel pnMessage;
        private System.Windows.Forms.RichTextBox txtMessage;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Timer timerWaitCloseDoor;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.Label lbNumber;
        private System.Windows.Forms.Timer timerResetSuccess;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.PictureBox picTitle;
    }
}