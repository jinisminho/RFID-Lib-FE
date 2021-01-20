namespace LibrarySelfCheckOut
{
    partial class ModalOK
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ModalOK));
            this.panel1 = new System.Windows.Forms.Panel();
            this.BtOK = new System.Windows.Forms.Button();
            this.lbMsg = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.BtOK);
            this.panel1.Controls.Add(this.lbMsg);
            this.panel1.Location = new System.Drawing.Point(4, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(592, 189);
            this.panel1.TabIndex = 0;
            // 
            // BtOK
            // 
            this.BtOK.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.BtOK.BackColor = System.Drawing.Color.RoyalBlue;
            this.BtOK.FlatAppearance.BorderSize = 0;
            this.BtOK.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.BtOK.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.BtOK.ForeColor = System.Drawing.Color.White;
            this.BtOK.Location = new System.Drawing.Point(415, 130);
            this.BtOK.Name = "BtOK";
            this.BtOK.Size = new System.Drawing.Size(130, 37);
            this.BtOK.TabIndex = 8;
            this.BtOK.TabStop = false;
            this.BtOK.Text = "OK";
            this.BtOK.UseMnemonic = false;
            this.BtOK.UseVisualStyleBackColor = false;
            this.BtOK.Click += new System.EventHandler(this.BtOK_Click);
            // 
            // lbMsg
            // 
            this.lbMsg.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbMsg.AutoSize = true;
            this.lbMsg.Font = new System.Drawing.Font("Calibri", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbMsg.Location = new System.Drawing.Point(45, 19);
            this.lbMsg.MaximumSize = new System.Drawing.Size(500, 0);
            this.lbMsg.Name = "lbMsg";
            this.lbMsg.Size = new System.Drawing.Size(500, 92);
            this.lbMsg.TabIndex = 0;
            this.lbMsg.Text = resources.GetString("lbMsg.Text");
            // 
            // ModalOK
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.RoyalBlue;
            this.ClientSize = new System.Drawing.Size(600, 195);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "ModalOK";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Modal";
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label lbMsg;
        private System.Windows.Forms.Button BtOK;
    }
}