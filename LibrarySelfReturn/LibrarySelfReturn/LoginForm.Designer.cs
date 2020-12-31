namespace LibrarySelfReturn
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(LoginForm));
            this.libimage = new System.Windows.Forms.PictureBox();
            this.lbWelcome = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.txtStudentRFID = new System.Windows.Forms.TextBox();
            this.lbMessage = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.libimage)).BeginInit();
            this.SuspendLayout();
            // 
            // libimage
            // 
            this.libimage.Dock = System.Windows.Forms.DockStyle.Top;
            this.libimage.Image = ((System.Drawing.Image)(resources.GetObject("libimage.Image")));
            this.libimage.Location = new System.Drawing.Point(0, 0);
            this.libimage.Name = "libimage";
            this.libimage.Size = new System.Drawing.Size(1193, 500);
            this.libimage.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.libimage.TabIndex = 0;
            this.libimage.TabStop = false;
            // 
            // lbWelcome
            // 
            this.lbWelcome.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbWelcome.AutoSize = true;
            this.lbWelcome.Font = new System.Drawing.Font("UD Digi Kyokasho N-B", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbWelcome.ForeColor = System.Drawing.Color.RoyalBlue;
            this.lbWelcome.Location = new System.Drawing.Point(109, 548);
            this.lbWelcome.Name = "lbWelcome";
            this.lbWelcome.Size = new System.Drawing.Size(919, 92);
            this.lbWelcome.TabIndex = 1;
            this.lbWelcome.Text = "WELCOME TO ABC LIBRARY";
            // 
            // label1
            // 
            this.label1.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 22.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.label1.Location = new System.Drawing.Point(199, 670);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(742, 44);
            this.label1.TabIndex = 2;
            this.label1.Text = "PLEASE SCAN YOUR STUDENT CARD TO LOGIN";
            // 
            // txtStudentRFID
            // 
            this.txtStudentRFID.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtStudentRFID.Location = new System.Drawing.Point(496, 771);
            this.txtStudentRFID.Name = "txtStudentRFID";
            this.txtStudentRFID.Size = new System.Drawing.Size(217, 22);
            this.txtStudentRFID.TabIndex = 3;
            this.txtStudentRFID.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtStudentRFID_KeyDown);
            // 
            // lbMessage
            // 
            this.lbMessage.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbMessage.AutoSize = true;
            this.lbMessage.Font = new System.Drawing.Font("UD Digi Kyokasho N-R", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbMessage.ForeColor = System.Drawing.Color.Red;
            this.lbMessage.Location = new System.Drawing.Point(444, 839);
            this.lbMessage.Name = "lbMessage";
            this.lbMessage.Size = new System.Drawing.Size(315, 33);
            this.lbMessage.TabIndex = 4;
            this.lbMessage.Text = "INVALID STUDENT CARD";
            // 
            // LoginForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1193, 929);
            this.Controls.Add(this.lbMessage);
            this.Controls.Add(this.txtStudentRFID);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.lbWelcome);
            this.Controls.Add(this.libimage);
            this.Name = "LoginForm";
            this.Text = "Library Self Return Application";
            this.Load += new System.EventHandler(this.LoginForm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.libimage)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox libimage;
        private System.Windows.Forms.Label lbWelcome;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtStudentRFID;
        private System.Windows.Forms.Label lbMessage;
    }
}

