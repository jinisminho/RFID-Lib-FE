namespace LibrarySelfCheckOut
{
    partial class CheckOutForm
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
            this.lbUsername = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.lbNoticeMaxBookBorrowAllowed = new System.Windows.Forms.Label();
            this.lbDate = new System.Windows.Forms.Label();
            this.txtBookRFID = new System.Windows.Forms.TextBox();
            this.panelHead = new System.Windows.Forms.Panel();
            this.panelCenter = new System.Windows.Forms.Panel();
            this.flowLayoutPanelBookList = new System.Windows.Forms.FlowLayoutPanel();
            this.btnFinish = new ePOSOne.btnProduct.Button_WOC();
            this.panelHead.SuspendLayout();
            this.panelCenter.SuspendLayout();
            this.SuspendLayout();
            // 
            // lbUsername
            // 
            this.lbUsername.AutoSize = true;
            this.lbUsername.Font = new System.Drawing.Font("UD Digi Kyokasho N-B", 25.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbUsername.ForeColor = System.Drawing.Color.RoyalBlue;
            this.lbUsername.Location = new System.Drawing.Point(28, 23);
            this.lbUsername.Name = "lbUsername";
            this.lbUsername.Size = new System.Drawing.Size(616, 50);
            this.lbUsername.TabIndex = 0;
            this.lbUsername.Text = "Welcome, tramphse@gmail.com";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("UD Digi Kyokasho NK-R", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.label1.Location = new System.Drawing.Point(33, 93);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(655, 33);
            this.label1.TabIndex = 1;
            this.label1.Text = "Scanning each book you would like to borow";
            // 
            // lbNoticeMaxBookBorrowAllowed
            // 
            this.lbNoticeMaxBookBorrowAllowed.AutoSize = true;
            this.lbNoticeMaxBookBorrowAllowed.Font = new System.Drawing.Font("UD Digi Kyokasho NK-R", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbNoticeMaxBookBorrowAllowed.Location = new System.Drawing.Point(35, 137);
            this.lbNoticeMaxBookBorrowAllowed.Name = "lbNoticeMaxBookBorrowAllowed";
            this.lbNoticeMaxBookBorrowAllowed.Size = new System.Drawing.Size(677, 22);
            this.lbNoticeMaxBookBorrowAllowed.TabIndex = 2;
            this.lbNoticeMaxBookBorrowAllowed.Text = "NOTICE: Each student is allowed to borrow maximun 4 books each time.";
            // 
            // lbDate
            // 
            this.lbDate.AutoSize = true;
            this.lbDate.Font = new System.Drawing.Font("UD Digi Kyokasho NP-R", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbDate.Location = new System.Drawing.Point(35, 208);
            this.lbDate.Name = "lbDate";
            this.lbDate.Size = new System.Drawing.Size(223, 24);
            this.lbDate.TabIndex = 3;
            this.lbDate.Text = "Date: 22 Dec, 2020";
            // 
            // txtBookRFID
            // 
            this.txtBookRFID.Location = new System.Drawing.Point(844, 210);
            this.txtBookRFID.Name = "txtBookRFID";
            this.txtBookRFID.Size = new System.Drawing.Size(299, 22);
            this.txtBookRFID.TabIndex = 4;
            this.txtBookRFID.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtBookRFID_KeyDown);
            // 
            // panelHead
            // 
            this.panelHead.Controls.Add(this.lbUsername);
            this.panelHead.Controls.Add(this.txtBookRFID);
            this.panelHead.Controls.Add(this.label1);
            this.panelHead.Controls.Add(this.lbDate);
            this.panelHead.Controls.Add(this.lbNoticeMaxBookBorrowAllowed);
            this.panelHead.Dock = System.Windows.Forms.DockStyle.Top;
            this.panelHead.Location = new System.Drawing.Point(0, 0);
            this.panelHead.Name = "panelHead";
            this.panelHead.Size = new System.Drawing.Size(1778, 268);
            this.panelHead.TabIndex = 5;
            // 
            // panelCenter
            // 
            this.panelCenter.Controls.Add(this.btnFinish);
            this.panelCenter.Controls.Add(this.flowLayoutPanelBookList);
            this.panelCenter.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelCenter.Location = new System.Drawing.Point(0, 268);
            this.panelCenter.Name = "panelCenter";
            this.panelCenter.Size = new System.Drawing.Size(1778, 661);
            this.panelCenter.TabIndex = 6;
            // 
            // flowLayoutPanelBookList
            // 
            this.flowLayoutPanelBookList.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.flowLayoutPanelBookList.AutoScroll = true;
            this.flowLayoutPanelBookList.Location = new System.Drawing.Point(39, 37);
            this.flowLayoutPanelBookList.Name = "flowLayoutPanelBookList";
            this.flowLayoutPanelBookList.Size = new System.Drawing.Size(1687, 532);
            this.flowLayoutPanelBookList.TabIndex = 0;
            // 
            // btnFinish
            // 
            this.btnFinish.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnFinish.BackColor = System.Drawing.SystemColors.Control;
            this.btnFinish.BorderColor = System.Drawing.Color.Silver;
            this.btnFinish.ButtonColor = System.Drawing.Color.RoyalBlue;
            this.btnFinish.FlatAppearance.BorderSize = 0;
            this.btnFinish.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnFinish.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.btnFinish.Location = new System.Drawing.Point(1538, 588);
            this.btnFinish.Name = "btnFinish";
            this.btnFinish.OnHoverBorderColor = System.Drawing.SystemColors.Control;
            this.btnFinish.OnHoverButtonColor = System.Drawing.Color.LightBlue;
            this.btnFinish.OnHoverTextColor = System.Drawing.Color.Gray;
            this.btnFinish.Size = new System.Drawing.Size(153, 50);
            this.btnFinish.TabIndex = 1;
            this.btnFinish.Text = "LOGOUT";
            this.btnFinish.TextColor = System.Drawing.Color.White;
            this.btnFinish.UseVisualStyleBackColor = false;
            this.btnFinish.Click += new System.EventHandler(this.btnFinish_Click);
            // 
            // CheckOutForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1778, 929);
            this.Controls.Add(this.panelCenter);
            this.Controls.Add(this.panelHead);
            this.Name = "CheckOutForm";
            this.Text = "Self Check Out Book Application";
            this.panelHead.ResumeLayout(false);
            this.panelHead.PerformLayout();
            this.panelCenter.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label lbUsername;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label lbNoticeMaxBookBorrowAllowed;
        private System.Windows.Forms.Label lbDate;
        private System.Windows.Forms.TextBox txtBookRFID;
        private System.Windows.Forms.Panel panelHead;
        private System.Windows.Forms.Panel panelCenter;
        private System.Windows.Forms.FlowLayoutPanel flowLayoutPanelBookList;
        private ePOSOne.btnProduct.Button_WOC btnFinish;
    }
}