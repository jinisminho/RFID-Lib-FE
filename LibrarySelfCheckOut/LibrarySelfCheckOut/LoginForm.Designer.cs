namespace LibrarySelfCheckOut
{
    partial class LoginForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(LoginForm));
            this.txtStudentRFID = new System.Windows.Forms.TextBox();
            this.lbMessage = new System.Windows.Forms.Label();
            this.lbsession = new System.Windows.Forms.Label();
            this.sessionTimer = new System.Windows.Forms.Timer(this.components);
            this.pnCenter = new System.Windows.Forms.Panel();
            this.pnLeft = new System.Windows.Forms.Panel();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.picTitle = new System.Windows.Forms.PictureBox();
            this.pcLogo = new System.Windows.Forms.PictureBox();
            this.spinner = new System.Windows.Forms.PictureBox();
            this.lbScan = new System.Windows.Forms.Label();
            this.panel5 = new System.Windows.Forms.Panel();
            this.pnCenter.SuspendLayout();
            this.pnLeft.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.picTitle)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pcLogo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.spinner)).BeginInit();
            this.SuspendLayout();
            // 
            // txtStudentRFID
            // 
            this.txtStudentRFID.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtStudentRFID.BackColor = System.Drawing.Color.White;
            this.txtStudentRFID.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtStudentRFID.ForeColor = System.Drawing.Color.White;
            this.txtStudentRFID.Location = new System.Drawing.Point(726, 871);
            this.txtStudentRFID.Name = "txtStudentRFID";
            this.txtStudentRFID.Size = new System.Drawing.Size(226, 15);
            this.txtStudentRFID.TabIndex = 5;
            this.txtStudentRFID.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtStudentRFID_KeyDown);
            // 
            // lbMessage
            // 
            this.lbMessage.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.lbMessage.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbMessage.ForeColor = System.Drawing.Color.Red;
            this.lbMessage.Location = new System.Drawing.Point(459, 578);
            this.lbMessage.Name = "lbMessage";
            this.lbMessage.Size = new System.Drawing.Size(744, 33);
            this.lbMessage.TabIndex = 7;
            this.lbMessage.Text = "INVALID USER PLEASE TRY AGAIN";
            this.lbMessage.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lbsession
            // 
            this.lbsession.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.lbsession.AutoSize = true;
            this.lbsession.Font = new System.Drawing.Font("Calibri", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbsession.ForeColor = System.Drawing.Color.White;
            this.lbsession.Location = new System.Drawing.Point(29, 871);
            this.lbsession.Name = "lbsession";
            this.lbsession.Size = new System.Drawing.Size(397, 49);
            this.lbsession.TabIndex = 10;
            this.lbsession.Text = "SESSION TIMEOUT: 60 ";
            // 
            // sessionTimer
            // 
            this.sessionTimer.Enabled = true;
            this.sessionTimer.Interval = 1000;
            this.sessionTimer.Tick += new System.EventHandler(this.sessionTimer_Tick);
            // 
            // pnCenter
            // 
            this.pnCenter.BackColor = System.Drawing.Color.White;
            this.pnCenter.Controls.Add(this.panel5);
            this.pnCenter.Controls.Add(this.pnLeft);
            this.pnCenter.Controls.Add(this.txtStudentRFID);
            this.pnCenter.Controls.Add(this.spinner);
            this.pnCenter.Controls.Add(this.lbScan);
            this.pnCenter.Controls.Add(this.lbMessage);
            this.pnCenter.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnCenter.Location = new System.Drawing.Point(0, 0);
            this.pnCenter.Name = "pnCenter";
            this.pnCenter.Size = new System.Drawing.Size(1206, 929);
            this.pnCenter.TabIndex = 15;
            this.pnCenter.Paint += new System.Windows.Forms.PaintEventHandler(this.panel2_Paint);
            // 
            // pnLeft
            // 
            this.pnLeft.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.pnLeft.Controls.Add(this.pictureBox1);
            this.pnLeft.Controls.Add(this.picTitle);
            this.pnLeft.Controls.Add(this.lbsession);
            this.pnLeft.Controls.Add(this.pcLogo);
            this.pnLeft.Dock = System.Windows.Forms.DockStyle.Left;
            this.pnLeft.Location = new System.Drawing.Point(0, 0);
            this.pnLeft.Name = "pnLeft";
            this.pnLeft.Size = new System.Drawing.Size(458, 929);
            this.pnLeft.TabIndex = 15;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::LibrarySelfCheckOut.Properties.Resources.back_arrow_white;
            this.pictureBox1.Location = new System.Drawing.Point(27, 12);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(63, 59);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 12;
            this.pictureBox1.TabStop = false;
            this.pictureBox1.Click += new System.EventHandler(this.pictureBox1_Click);
            // 
            // picTitle
            // 
            this.picTitle.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.picTitle.Image = global::LibrarySelfCheckOut.Properties.Resources.CSV_dark;
            this.picTitle.Location = new System.Drawing.Point(74, 440);
            this.picTitle.Name = "picTitle";
            this.picTitle.Size = new System.Drawing.Size(318, 42);
            this.picTitle.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.picTitle.TabIndex = 1;
            this.picTitle.TabStop = false;
            // 
            // pcLogo
            // 
            this.pcLogo.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.pcLogo.Image = global::LibrarySelfCheckOut.Properties.Resources.logo_dark_bcg;
            this.pcLogo.Location = new System.Drawing.Point(74, 277);
            this.pcLogo.Name = "pcLogo";
            this.pcLogo.Size = new System.Drawing.Size(318, 142);
            this.pcLogo.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pcLogo.TabIndex = 0;
            this.pcLogo.TabStop = false;
            // 
            // spinner
            // 
            this.spinner.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.spinner.Image = global::LibrarySelfCheckOut.Properties.Resources.Spinner_trans__1_;
            this.spinner.Location = new System.Drawing.Point(792, 473);
            this.spinner.Name = "spinner";
            this.spinner.Size = new System.Drawing.Size(81, 69);
            this.spinner.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.spinner.TabIndex = 14;
            this.spinner.TabStop = false;
            // 
            // lbScan
            // 
            this.lbScan.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.lbScan.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 22.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbScan.Location = new System.Drawing.Point(464, 344);
            this.lbScan.Name = "lbScan";
            this.lbScan.Size = new System.Drawing.Size(739, 44);
            this.lbScan.TabIndex = 1;
            this.lbScan.Text = "PLEASE SCAN YOUR ID CARD\r\n";
            this.lbScan.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // panel5
            // 
            this.panel5.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.panel5.Location = new System.Drawing.Point(559, 836);
            this.panel5.Name = "panel5";
            this.panel5.Size = new System.Drawing.Size(547, 84);
            this.panel5.TabIndex = 16;
            // 
            // LoginForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(1206, 929);
            this.Controls.Add(this.pnCenter);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "LoginForm";
            this.Text = "SMART LIBRARY";
            this.Load += new System.EventHandler(this.LoginForm_Load);
            this.pnCenter.ResumeLayout(false);
            this.pnCenter.PerformLayout();
            this.pnLeft.ResumeLayout(false);
            this.pnLeft.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.picTitle)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pcLogo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.spinner)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.TextBox txtStudentRFID;
        private System.Windows.Forms.Label lbMessage;
        private System.Windows.Forms.Label lbsession;
        private System.Windows.Forms.Timer sessionTimer;
        private System.Windows.Forms.PictureBox spinner;
        private System.Windows.Forms.Panel pnCenter;
        private System.Windows.Forms.Label lbScan;
        private System.Windows.Forms.Panel pnLeft;
        private System.Windows.Forms.PictureBox picTitle;
        private System.Windows.Forms.PictureBox pcLogo;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Panel panel5;
    }
}

