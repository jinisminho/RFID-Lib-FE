namespace LibrarySelfCheckOut
{
    partial class BookReturnItem
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.panel1 = new System.Windows.Forms.Panel();
            this.lbIndex = new System.Windows.Forms.Label();
            this.panel2 = new System.Windows.Forms.Panel();
            this.panel3 = new System.Windows.Forms.Panel();
            this.lbBook = new System.Windows.Forms.Label();
            this.lbUser = new System.Windows.Forms.Label();
            this.lbStatus = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.lbIndex);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Left;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(81, 124);
            this.panel1.TabIndex = 0;
            // 
            // lbIndex
            // 
            this.lbIndex.AutoSize = true;
            this.lbIndex.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbIndex.Location = new System.Drawing.Point(28, 54);
            this.lbIndex.Name = "lbIndex";
            this.lbIndex.Size = new System.Drawing.Size(25, 24);
            this.lbIndex.TabIndex = 0;
            this.lbIndex.Text = "1.";
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.lbStatus);
            this.panel2.Controls.Add(this.panel3);
            this.panel2.Controls.Add(this.lbBook);
            this.panel2.Controls.Add(this.lbUser);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(81, 0);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(867, 124);
            this.panel2.TabIndex = 1;
            // 
            // panel3
            // 
            this.panel3.BackColor = System.Drawing.SystemColors.Control;
            this.panel3.Location = new System.Drawing.Point(-5, 0);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(10, 125);
            this.panel3.TabIndex = 4;
            // 
            // lbBook
            // 
            this.lbBook.AutoSize = true;
            this.lbBook.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbBook.Location = new System.Drawing.Point(22, 47);
            this.lbBook.Name = "lbBook";
            this.lbBook.Size = new System.Drawing.Size(155, 24);
            this.lbBook.TabIndex = 3;
            this.lbBook.Text = "Book: The Hobbit";
            // 
            // lbUser
            // 
            this.lbUser.AutoSize = true;
            this.lbUser.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbUser.Location = new System.Drawing.Point(22, 12);
            this.lbUser.Name = "lbUser";
            this.lbUser.Size = new System.Drawing.Size(348, 24);
            this.lbUser.TabIndex = 2;
            this.lbUser.Text = "Username: tramphse130038@fpt.edu.vn";
            // 
            // lbStatus
            // 
            this.lbStatus.AutoSize = true;
            this.lbStatus.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbStatus.Location = new System.Drawing.Point(22, 82);
            this.lbStatus.Name = "lbStatus";
            this.lbStatus.Size = new System.Drawing.Size(162, 24);
            this.lbStatus.TabIndex = 5;
            this.lbStatus.Text = "Status: RETURNED";
            // 
            // BookReturnItem
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.panel1);
            this.Name = "BookReturnItem";
            this.Size = new System.Drawing.Size(948, 124);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label lbIndex;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Label lbBook;
        private System.Windows.Forms.Label lbUser;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.Label lbStatus;
    }
}
