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
            this.components = new System.ComponentModel.Container();
            this.lbUsername = new System.Windows.Forms.Label();
            this.lbIntruction = new System.Windows.Forms.Label();
            this.lbNoticeMaxBookBorrowAllowed = new System.Windows.Forms.Label();
            this.txtBookRFID = new System.Windows.Forms.TextBox();
            this.panelHead = new System.Windows.Forms.Panel();
            this.spiner = new System.Windows.Forms.PictureBox();
            this.lbDate = new System.Windows.Forms.Label();
            this.panelCenter = new System.Windows.Forms.Panel();
            this.pnReturnSt = new System.Windows.Forms.Panel();
            this.lbReturnNotice = new System.Windows.Forms.Label();
            this.lbSession = new System.Windows.Forms.Label();
            this.btDone = new System.Windows.Forms.Button();
            this.flowLayoutPanelBookList = new System.Windows.Forms.FlowLayoutPanel();
            this.timerSession = new System.Windows.Forms.Timer(this.components);
            this.panelHead.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spiner)).BeginInit();
            this.panelCenter.SuspendLayout();
            this.pnReturnSt.SuspendLayout();
            this.SuspendLayout();
            // 
            // lbUsername
            // 
            this.lbUsername.AutoSize = true;
            this.lbUsername.Font = new System.Drawing.Font("UD Digi Kyokasho N-B", 25.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbUsername.ForeColor = System.Drawing.Color.RoyalBlue;
            this.lbUsername.Location = new System.Drawing.Point(30, 31);
            this.lbUsername.Name = "lbUsername";
            this.lbUsername.Size = new System.Drawing.Size(616, 50);
            this.lbUsername.TabIndex = 0;
            this.lbUsername.Text = "Welcome, tramphse@gmail.com";
            // 
            // lbIntruction
            // 
            this.lbIntruction.AutoSize = true;
            this.lbIntruction.Font = new System.Drawing.Font("UD Digi Kyokasho NK-R", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbIntruction.Location = new System.Drawing.Point(33, 107);
            this.lbIntruction.Name = "lbIntruction";
            this.lbIntruction.Size = new System.Drawing.Size(634, 33);
            this.lbIntruction.TabIndex = 1;
            this.lbIntruction.Text = "Place book(s) on the scanner to check out";
            // 
            // lbNoticeMaxBookBorrowAllowed
            // 
            this.lbNoticeMaxBookBorrowAllowed.AutoSize = true;
            this.lbNoticeMaxBookBorrowAllowed.Font = new System.Drawing.Font("UD Digi Kyokasho NK-R", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbNoticeMaxBookBorrowAllowed.Location = new System.Drawing.Point(35, 164);
            this.lbNoticeMaxBookBorrowAllowed.Name = "lbNoticeMaxBookBorrowAllowed";
            this.lbNoticeMaxBookBorrowAllowed.Size = new System.Drawing.Size(677, 22);
            this.lbNoticeMaxBookBorrowAllowed.TabIndex = 2;
            this.lbNoticeMaxBookBorrowAllowed.Text = "NOTICE: Each student is allowed to borrow maximun 4 books each time.";
            // 
            // txtBookRFID
            // 
            this.txtBookRFID.Location = new System.Drawing.Point(906, 138);
            this.txtBookRFID.Name = "txtBookRFID";
            this.txtBookRFID.Size = new System.Drawing.Size(299, 22);
            this.txtBookRFID.TabIndex = 4;
            this.txtBookRFID.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtBookRFID_KeyDown);
            // 
            // panelHead
            // 
            this.panelHead.Controls.Add(this.spiner);
            this.panelHead.Controls.Add(this.lbUsername);
            this.panelHead.Controls.Add(this.txtBookRFID);
            this.panelHead.Controls.Add(this.lbIntruction);
            this.panelHead.Controls.Add(this.lbDate);
            this.panelHead.Controls.Add(this.lbNoticeMaxBookBorrowAllowed);
            this.panelHead.Dock = System.Windows.Forms.DockStyle.Top;
            this.panelHead.Location = new System.Drawing.Point(0, 0);
            this.panelHead.Name = "panelHead";
            this.panelHead.Size = new System.Drawing.Size(1778, 268);
            this.panelHead.TabIndex = 5;
            // 
            // spiner
            // 
            this.spiner.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.spiner.Image = global::LibrarySelfCheckOut.Properties.Resources.Spinner_1s_200px;
            this.spiner.Location = new System.Drawing.Point(837, 191);
            this.spiner.Name = "spiner";
            this.spiner.Size = new System.Drawing.Size(101, 71);
            this.spiner.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.spiner.TabIndex = 5;
            this.spiner.TabStop = false;
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
            // panelCenter
            // 
            this.panelCenter.Controls.Add(this.pnReturnSt);
            this.panelCenter.Controls.Add(this.lbSession);
            this.panelCenter.Controls.Add(this.btDone);
            this.panelCenter.Controls.Add(this.flowLayoutPanelBookList);
            this.panelCenter.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelCenter.Location = new System.Drawing.Point(0, 268);
            this.panelCenter.Name = "panelCenter";
            this.panelCenter.Size = new System.Drawing.Size(1778, 661);
            this.panelCenter.TabIndex = 6;
            // 
            // pnReturnSt
            // 
            this.pnReturnSt.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.pnReturnSt.BackColor = System.Drawing.Color.White;
            this.pnReturnSt.Controls.Add(this.lbReturnNotice);
            this.pnReturnSt.Location = new System.Drawing.Point(39, 501);
            this.pnReturnSt.Name = "pnReturnSt";
            this.pnReturnSt.Size = new System.Drawing.Size(1687, 69);
            this.pnReturnSt.TabIndex = 6;
            // 
            // lbReturnNotice
            // 
            this.lbReturnNotice.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbReturnNotice.AutoSize = true;
            this.lbReturnNotice.Font = new System.Drawing.Font("UD Digi Kyokasho NP-R", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbReturnNotice.ForeColor = System.Drawing.Color.SeaGreen;
            this.lbReturnNotice.Location = new System.Drawing.Point(460, 27);
            this.lbReturnNotice.Name = "lbReturnNotice";
            this.lbReturnNotice.Size = new System.Drawing.Size(644, 24);
            this.lbReturnNotice.TabIndex = 0;
            this.lbReturnNotice.Text = "Check out successfully. Please return before: 2021/01/02";
            // 
            // lbSession
            // 
            this.lbSession.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.lbSession.AutoSize = true;
            this.lbSession.Font = new System.Drawing.Font("Calibri", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbSession.ForeColor = System.Drawing.Color.Firebrick;
            this.lbSession.Location = new System.Drawing.Point(30, 599);
            this.lbSession.Name = "lbSession";
            this.lbSession.Size = new System.Drawing.Size(388, 49);
            this.lbSession.TabIndex = 5;
            this.lbSession.Text = "SESSION TIMEOUT: 30";
            // 
            // btDone
            // 
            this.btDone.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btDone.BackColor = System.Drawing.Color.RoyalBlue;
            this.btDone.FlatAppearance.BorderSize = 0;
            this.btDone.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btDone.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.btDone.ForeColor = System.Drawing.Color.White;
            this.btDone.Location = new System.Drawing.Point(1527, 589);
            this.btDone.Name = "btDone";
            this.btDone.Size = new System.Drawing.Size(199, 47);
            this.btDone.TabIndex = 2;
            this.btDone.Text = "EXIT";
            this.btDone.UseMnemonic = false;
            this.btDone.UseVisualStyleBackColor = false;
            this.btDone.Click += new System.EventHandler(this.btLogout_Click);
            // 
            // flowLayoutPanelBookList
            // 
            this.flowLayoutPanelBookList.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.flowLayoutPanelBookList.AutoScroll = true;
            this.flowLayoutPanelBookList.Location = new System.Drawing.Point(39, 37);
            this.flowLayoutPanelBookList.Name = "flowLayoutPanelBookList";
            this.flowLayoutPanelBookList.Size = new System.Drawing.Size(1687, 436);
            this.flowLayoutPanelBookList.TabIndex = 0;
            // 
            // timerSession
            // 
            this.timerSession.Enabled = true;
            this.timerSession.Interval = 1000;
            this.timerSession.Tick += new System.EventHandler(this.sessionTimer_Tick);
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
            ((System.ComponentModel.ISupportInitialize)(this.spiner)).EndInit();
            this.panelCenter.ResumeLayout(false);
            this.panelCenter.PerformLayout();
            this.pnReturnSt.ResumeLayout(false);
            this.pnReturnSt.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label lbUsername;
        private System.Windows.Forms.Label lbIntruction;
        private System.Windows.Forms.Label lbNoticeMaxBookBorrowAllowed;
        private System.Windows.Forms.TextBox txtBookRFID;
        private System.Windows.Forms.Panel panelHead;
        private System.Windows.Forms.Panel panelCenter;
        private System.Windows.Forms.FlowLayoutPanel flowLayoutPanelBookList;
        private System.Windows.Forms.Button btDone;
        private System.Windows.Forms.Timer timerSession;
        private System.Windows.Forms.Label lbSession;
        private System.Windows.Forms.Panel pnReturnSt;
        private System.Windows.Forms.Label lbReturnNotice;
        private System.Windows.Forms.PictureBox spiner;
        private System.Windows.Forms.Label lbDate;
    }
}