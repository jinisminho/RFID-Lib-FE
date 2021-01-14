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
            this.label3 = new System.Windows.Forms.Label();
            this.txtStudentRFID = new System.Windows.Forms.TextBox();
            this.lbMessage = new System.Windows.Forms.Label();
            this.lbsession = new System.Windows.Forms.Label();
            this.sessionTimer = new System.Windows.Forms.Timer(this.components);
            this.btBack = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.lbIncorrectPin = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // label3
            // 
            this.label3.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label3.AutoSize = true;
            this.label3.BackColor = System.Drawing.Color.Transparent;
            this.label3.Font = new System.Drawing.Font("UD Digi Kyokasho N-B", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.label3.ForeColor = System.Drawing.Color.RoyalBlue;
            this.label3.Location = new System.Drawing.Point(132, 97);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(919, 92);
            this.label3.TabIndex = 4;
            this.label3.Text = "SELF CHECK OUT SERVICE";
            // 
            // txtStudentRFID
            // 
            this.txtStudentRFID.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtStudentRFID.Location = new System.Drawing.Point(456, 292);
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
            this.lbMessage.Location = new System.Drawing.Point(338, 444);
            this.lbMessage.Name = "lbMessage";
            this.lbMessage.Size = new System.Drawing.Size(450, 33);
            this.lbMessage.TabIndex = 7;
            this.lbMessage.Text = "INVALID USER PLEASE TRY AGAIN";
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
            this.panel1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panel1.Location = new System.Drawing.Point(0, 829);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1193, 100);
            this.panel1.TabIndex = 12;
            // 
            // lbIncorrectPin
            // 
            this.lbIncorrectPin.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbIncorrectPin.AutoSize = true;
            this.lbIncorrectPin.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbIncorrectPin.ForeColor = System.Drawing.Color.Red;
            this.lbIncorrectPin.Location = new System.Drawing.Point(330, 486);
            this.lbIncorrectPin.Name = "lbIncorrectPin";
            this.lbIncorrectPin.Size = new System.Drawing.Size(465, 33);
            this.lbIncorrectPin.TabIndex = 13;
            this.lbIncorrectPin.Text = "INCORRECT PIN PLEASE TRY AGAIN";
            // 
            // label2
            // 
            this.label2.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 22.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.label2.Location = new System.Drawing.Point(353, 223);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(476, 44);
            this.label2.TabIndex = 1;
            this.label2.Text = "PLEASE SCAN YOUR ID CARD\r\n";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // LoginForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1193, 929);
            this.Controls.Add(this.lbIncorrectPin);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.lbMessage);
            this.Controls.Add(this.txtStudentRFID);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Name = "LoginForm";
            this.Text = "LIBRARY SELF CHECK-OUT";
            this.Load += new System.EventHandler(this.LoginForm_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtStudentRFID;
        private System.Windows.Forms.Label lbMessage;
        private System.Windows.Forms.Label lbsession;
        private System.Windows.Forms.Timer sessionTimer;
        private System.Windows.Forms.Button btBack;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label lbIncorrectPin;
        private System.Windows.Forms.Label label2;
    }
}

