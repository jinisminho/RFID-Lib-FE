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
            this.label2 = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.label3 = new System.Windows.Forms.Label();
            this.txtStudentRFID = new System.Windows.Forms.TextBox();
            this.lbMessage = new System.Windows.Forms.Label();
            this.txtPass = new System.Windows.Forms.TextBox();
            this.lbPin = new System.Windows.Forms.Label();
            this.lbsession = new System.Windows.Forms.Label();
            this.sessionTimer = new System.Windows.Forms.Timer(this.components);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // label2
            // 
            this.label2.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 22.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.label2.Location = new System.Drawing.Point(304, 664);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(571, 44);
            this.label2.TabIndex = 1;
            this.label2.Text = "PLEASE SCAN YOUR STUDENT CARD\r\n";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Dock = System.Windows.Forms.DockStyle.Top;
            this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location = new System.Drawing.Point(0, 0);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(1193, 500);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 2;
            this.pictureBox1.TabStop = false;
            // 
            // label3
            // 
            this.label3.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label3.AutoSize = true;
            this.label3.BackColor = System.Drawing.Color.Transparent;
            this.label3.Font = new System.Drawing.Font("UD Digi Kyokasho N-B", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.label3.ForeColor = System.Drawing.Color.RoyalBlue;
            this.label3.Location = new System.Drawing.Point(120, 548);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(919, 92);
            this.label3.TabIndex = 4;
            this.label3.Text = "SELF CHECK OUT SERVICE";
            // 
            // txtStudentRFID
            // 
            this.txtStudentRFID.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtStudentRFID.Location = new System.Drawing.Point(483, 735);
            this.txtStudentRFID.Name = "txtStudentRFID";
            this.txtStudentRFID.Size = new System.Drawing.Size(226, 22);
            this.txtStudentRFID.TabIndex = 5;
            this.txtStudentRFID.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtStudentRFID_KeyDown);
            // 
            // lbMessage
            // 
            this.lbMessage.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbMessage.AutoSize = true;
            this.lbMessage.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbMessage.ForeColor = System.Drawing.Color.Red;
            this.lbMessage.Location = new System.Drawing.Point(302, 833);
            this.lbMessage.Name = "lbMessage";
            this.lbMessage.Size = new System.Drawing.Size(570, 33);
            this.lbMessage.TabIndex = 7;
            this.lbMessage.Text = "INVALID STUDENT CARD PLEASE TRY AGAIN";
            // 
            // txtPass
            // 
            this.txtPass.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtPass.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.txtPass.Location = new System.Drawing.Point(541, 786);
            this.txtPass.Name = "txtPass";
            this.txtPass.PasswordChar = '*';
            this.txtPass.ShortcutsEnabled = false;
            this.txtPass.Size = new System.Drawing.Size(168, 30);
            this.txtPass.TabIndex = 8;
            this.txtPass.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtPass_KeyDown);
            // 
            // lbPin
            // 
            this.lbPin.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbPin.AutoSize = true;
            this.lbPin.Font = new System.Drawing.Font("UD Digi Kyokasho NP-B", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbPin.Location = new System.Drawing.Point(479, 791);
            this.lbPin.Name = "lbPin";
            this.lbPin.Size = new System.Drawing.Size(56, 24);
            this.lbPin.TabIndex = 9;
            this.lbPin.Text = "PIN:";
            // 
            // lbsession
            // 
            this.lbsession.AutoSize = true;
            this.lbsession.Font = new System.Drawing.Font("Calibri", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbsession.ForeColor = System.Drawing.Color.Firebrick;
            this.lbsession.Location = new System.Drawing.Point(25, 19);
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
            // LoginForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1193, 929);
            this.Controls.Add(this.lbsession);
            this.Controls.Add(this.lbPin);
            this.Controls.Add(this.txtPass);
            this.Controls.Add(this.lbMessage);
            this.Controls.Add(this.txtStudentRFID);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.label2);
            this.Name = "LoginForm";
            this.Text = "LIBRARY SELF CHECK-OUT";
            this.Load += new System.EventHandler(this.LoginForm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtStudentRFID;
        private System.Windows.Forms.Label lbMessage;
        private System.Windows.Forms.TextBox txtPass;
        private System.Windows.Forms.Label lbPin;
        private System.Windows.Forms.Label lbsession;
        private System.Windows.Forms.Timer sessionTimer;
    }
}

