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
            this.lbWelcome = new System.Windows.Forms.Label();
            this.txtStudentRFID = new System.Windows.Forms.TextBox();
            this.lbMessage = new System.Windows.Forms.Label();
            this.lbsession = new System.Windows.Forms.Label();
            this.sessionTimer = new System.Windows.Forms.Timer(this.components);
            this.btBack = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.lbScan = new System.Windows.Forms.Label();
            this.spinner = new System.Windows.Forms.PictureBox();
            this.panel2 = new System.Windows.Forms.Panel();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spinner)).BeginInit();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // lbWelcome
            // 
            this.lbWelcome.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.lbWelcome.BackColor = System.Drawing.Color.Transparent;
            this.lbWelcome.Font = new System.Drawing.Font("UD Digi Kyokasho N-B", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbWelcome.ForeColor = System.Drawing.Color.RoyalBlue;
            this.lbWelcome.Location = new System.Drawing.Point(3, 120);
            this.lbWelcome.Name = "lbWelcome";
            this.lbWelcome.Size = new System.Drawing.Size(1187, 92);
            this.lbWelcome.TabIndex = 4;
            this.lbWelcome.Text = "SELF CHECK OUT SERVICE";
            this.lbWelcome.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // txtStudentRFID
            // 
            this.txtStudentRFID.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtStudentRFID.Location = new System.Drawing.Point(524, 44);
            this.txtStudentRFID.Name = "txtStudentRFID";
            this.txtStudentRFID.Size = new System.Drawing.Size(226, 22);
            this.txtStudentRFID.TabIndex = 5;
            this.txtStudentRFID.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtStudentRFID_KeyDown);
            // 
            // lbMessage
            // 
            this.lbMessage.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.lbMessage.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbMessage.ForeColor = System.Drawing.Color.Red;
            this.lbMessage.Location = new System.Drawing.Point(3, 528);
            this.lbMessage.Name = "lbMessage";
            this.lbMessage.Size = new System.Drawing.Size(1187, 33);
            this.lbMessage.TabIndex = 7;
            this.lbMessage.Text = "INVALID USER PLEASE TRY AGAIN";
            this.lbMessage.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lbsession
            // 
            this.lbsession.AutoSize = true;
            this.lbsession.Font = new System.Drawing.Font("Calibri", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbsession.ForeColor = System.Drawing.Color.Firebrick;
            this.lbsession.Location = new System.Drawing.Point(24, 29);
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
            // btBack
            // 
            this.btBack.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btBack.BackColor = System.Drawing.Color.RoyalBlue;
            this.btBack.FlatAppearance.BorderSize = 0;
            this.btBack.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btBack.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.btBack.ForeColor = System.Drawing.Color.White;
            this.btBack.Location = new System.Drawing.Point(963, 30);
            this.btBack.Name = "btBack";
            this.btBack.Size = new System.Drawing.Size(199, 47);
            this.btBack.TabIndex = 11;
            this.btBack.TabStop = false;
            this.btBack.Text = "BACK";
            this.btBack.UseMnemonic = false;
            this.btBack.UseVisualStyleBackColor = false;
            this.btBack.Click += new System.EventHandler(this.btBack_Click);
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.btBack);
            this.panel1.Controls.Add(this.lbsession);
            this.panel1.Controls.Add(this.txtStudentRFID);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panel1.Location = new System.Drawing.Point(0, 829);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1193, 100);
            this.panel1.TabIndex = 12;
            // 
            // lbScan
            // 
            this.lbScan.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.lbScan.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 22.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbScan.Location = new System.Drawing.Point(3, 249);
            this.lbScan.Name = "lbScan";
            this.lbScan.Size = new System.Drawing.Size(1187, 44);
            this.lbScan.TabIndex = 1;
            this.lbScan.Text = "PLEASE SCAN YOUR ID CARD\r\n";
            this.lbScan.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // spinner
            // 
            this.spinner.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.spinner.Image = global::LibrarySelfCheckOut.Properties.Resources.Spinner_1s_200px;
            this.spinner.Location = new System.Drawing.Point(544, 370);
            this.spinner.Name = "spinner";
            this.spinner.Size = new System.Drawing.Size(81, 69);
            this.spinner.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.spinner.TabIndex = 14;
            this.spinner.TabStop = false;
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.lbWelcome);
            this.panel2.Controls.Add(this.spinner);
            this.panel2.Controls.Add(this.lbScan);
            this.panel2.Controls.Add(this.lbMessage);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(0, 0);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(1193, 829);
            this.panel2.TabIndex = 15;
            // 
            // LoginForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1193, 929);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.panel1);
            this.Name = "LoginForm";
            this.Text = "LIBRARY SELF CHECK-OUT";
            this.Load += new System.EventHandler(this.LoginForm_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spinner)).EndInit();
            this.panel2.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.Label lbWelcome;
        private System.Windows.Forms.TextBox txtStudentRFID;
        private System.Windows.Forms.Label lbMessage;
        private System.Windows.Forms.Label lbsession;
        private System.Windows.Forms.Timer sessionTimer;
        private System.Windows.Forms.Button btBack;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label lbScan;
        private System.Windows.Forms.PictureBox spinner;
        private System.Windows.Forms.Panel panel2;
    }
}

