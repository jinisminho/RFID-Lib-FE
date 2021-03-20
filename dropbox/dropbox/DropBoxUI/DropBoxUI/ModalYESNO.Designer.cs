namespace DropBoxUI
{
    partial class ModalYESNO
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ModalYESNO));
            this.panel1 = new System.Windows.Forms.Panel();
            this.panel2 = new System.Windows.Forms.Panel();
            this.lbHeader = new System.Windows.Forms.Label();
            this.btYes = new System.Windows.Forms.Button();
            this.btNO = new System.Windows.Forms.Button();
            this.lbMsg = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.panel2);
            this.panel1.Controls.Add(this.btYes);
            this.panel1.Controls.Add(this.btNO);
            this.panel1.Controls.Add(this.lbMsg);
            this.panel1.Location = new System.Drawing.Point(4, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(592, 217);
            this.panel1.TabIndex = 2;
            // 
            // panel2
            // 
            this.panel2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.panel2.Controls.Add(this.lbHeader);
            this.panel2.Location = new System.Drawing.Point(0, 0);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(592, 41);
            this.panel2.TabIndex = 11;
            // 
            // lbHeader
            // 
            this.lbHeader.AutoSize = true;
            this.lbHeader.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbHeader.ForeColor = System.Drawing.Color.White;
            this.lbHeader.Location = new System.Drawing.Point(13, 8);
            this.lbHeader.Name = "lbHeader";
            this.lbHeader.Size = new System.Drawing.Size(82, 24);
            this.lbHeader.TabIndex = 0;
            this.lbHeader.Text = "Message";
            // 
            // btYes
            // 
            this.btYes.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btYes.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.btYes.FlatAppearance.BorderSize = 0;
            this.btYes.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btYes.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.btYes.ForeColor = System.Drawing.Color.White;
            this.btYes.Location = new System.Drawing.Point(279, 158);
            this.btYes.Name = "btYes";
            this.btYes.Size = new System.Drawing.Size(130, 37);
            this.btYes.TabIndex = 9;
            this.btYes.TabStop = false;
            this.btYes.Text = "YES";
            this.btYes.UseMnemonic = false;
            this.btYes.UseVisualStyleBackColor = false;
            this.btYes.Click += new System.EventHandler(this.ntYes_Click);
            // 
            // btNO
            // 
            this.btNO.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btNO.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.btNO.FlatAppearance.BorderSize = 0;
            this.btNO.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btNO.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.btNO.ForeColor = System.Drawing.Color.White;
            this.btNO.Location = new System.Drawing.Point(421, 158);
            this.btNO.Name = "btNO";
            this.btNO.Size = new System.Drawing.Size(130, 37);
            this.btNO.TabIndex = 8;
            this.btNO.TabStop = false;
            this.btNO.Text = "NO";
            this.btNO.UseMnemonic = false;
            this.btNO.UseVisualStyleBackColor = false;
            this.btNO.Click += new System.EventHandler(this.btNO_Click);
            // 
            // lbMsg
            // 
            this.lbMsg.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbMsg.AutoSize = true;
            this.lbMsg.Font = new System.Drawing.Font("Calibri", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbMsg.Location = new System.Drawing.Point(45, 51);
            this.lbMsg.MaximumSize = new System.Drawing.Size(500, 0);
            this.lbMsg.Name = "lbMsg";
            this.lbMsg.Size = new System.Drawing.Size(500, 92);
            this.lbMsg.TabIndex = 0;
            this.lbMsg.Text = resources.GetString("lbMsg.Text");
            // 
            // ModalYESNO
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.ClientSize = new System.Drawing.Size(600, 223);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "ModalYESNO";
            this.Text = "ModalYESNO";
            this.TopMost = true;
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Label lbHeader;
        private System.Windows.Forms.Button btYes;
        private System.Windows.Forms.Button btNO;
        private System.Windows.Forms.Label lbMsg;
    }
}