namespace LibrarySelfCheckOut
{
    partial class BookItem
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
            this.panelNo = new System.Windows.Forms.Panel();
            this.lbIndex = new System.Windows.Forms.Label();
            this.spliter1 = new System.Windows.Forms.Panel();
            this.panel1 = new System.Windows.Forms.Panel();
            this.lbStatus = new System.Windows.Forms.Label();
            this.lbBook = new System.Windows.Forms.Label();
            this.panel2 = new System.Windows.Forms.Panel();
            this.panel3 = new System.Windows.Forms.Panel();
            this.lbDueDate = new System.Windows.Forms.Label();
            this.panelNo.SuspendLayout();
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // panelNo
            // 
            this.panelNo.Controls.Add(this.lbIndex);
            this.panelNo.Controls.Add(this.spliter1);
            this.panelNo.Dock = System.Windows.Forms.DockStyle.Left;
            this.panelNo.Location = new System.Drawing.Point(0, 0);
            this.panelNo.Name = "panelNo";
            this.panelNo.Size = new System.Drawing.Size(111, 75);
            this.panelNo.TabIndex = 0;
            // 
            // lbIndex
            // 
            this.lbIndex.AutoSize = true;
            this.lbIndex.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbIndex.Location = new System.Drawing.Point(47, 28);
            this.lbIndex.Name = "lbIndex";
            this.lbIndex.Size = new System.Drawing.Size(25, 24);
            this.lbIndex.TabIndex = 0;
            this.lbIndex.Text = "1.";
            // 
            // spliter1
            // 
            this.spliter1.BackColor = System.Drawing.SystemColors.Control;
            this.spliter1.Location = new System.Drawing.Point(103, 0);
            this.spliter1.Name = "spliter1";
            this.spliter1.Size = new System.Drawing.Size(2, 77);
            this.spliter1.TabIndex = 3;
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.lbStatus);
            this.panel1.Controls.Add(this.lbBook);
            this.panel1.Controls.Add(this.panel2);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(111, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(822, 75);
            this.panel1.TabIndex = 1;
            // 
            // lbStatus
            // 
            this.lbStatus.AutoSize = true;
            this.lbStatus.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbStatus.Location = new System.Drawing.Point(22, 38);
            this.lbStatus.Name = "lbStatus";
            this.lbStatus.Size = new System.Drawing.Size(189, 24);
            this.lbStatus.TabIndex = 6;
            this.lbStatus.Text = "Status: CHECKED OUT";
            // 
            // lbBook
            // 
            this.lbBook.AutoSize = true;
            this.lbBook.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbBook.Location = new System.Drawing.Point(21, 9);
            this.lbBook.Name = "lbBook";
            this.lbBook.Size = new System.Drawing.Size(154, 24);
            this.lbBook.TabIndex = 5;
            this.lbBook.Text = "Book: The hobbit";
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.panel3);
            this.panel2.Controls.Add(this.lbDueDate);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Right;
            this.panel2.Location = new System.Drawing.Point(622, 0);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(200, 75);
            this.panel2.TabIndex = 4;
            // 
            // panel3
            // 
            this.panel3.BackColor = System.Drawing.SystemColors.Control;
            this.panel3.Location = new System.Drawing.Point(3, 0);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(2, 77);
            this.panel3.TabIndex = 4;
            // 
            // lbDueDate
            // 
            this.lbDueDate.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.lbDueDate.AutoSize = true;
            this.lbDueDate.Font = new System.Drawing.Font("Calibri", 10.2F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbDueDate.Location = new System.Drawing.Point(20, 12);
            this.lbDueDate.Name = "lbDueDate";
            this.lbDueDate.Size = new System.Drawing.Size(168, 21);
            this.lbDueDate.TabIndex = 0;
            this.lbDueDate.Text = "Due date: 2021/01/14";
            // 
            // BookItem
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.panelNo);
            this.Name = "BookItem";
            this.Size = new System.Drawing.Size(933, 75);
            this.Load += new System.EventHandler(this.BookItem_Load);
            this.panelNo.ResumeLayout(false);
            this.panelNo.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panelNo;
        private System.Windows.Forms.Label lbIndex;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Panel spliter1;
        private System.Windows.Forms.Label lbStatus;
        private System.Windows.Forms.Label lbBook;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.Label lbDueDate;
    }
}
