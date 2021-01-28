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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CheckOutForm));
            this.lbUsername = new System.Windows.Forms.Label();
            this.lbIntruction = new System.Windows.Forms.Label();
            this.txtBookRFID = new System.Windows.Forms.TextBox();
            this.panelHead = new System.Windows.Forms.Panel();
            this.pnNav = new System.Windows.Forms.Panel();
            this.spiner = new System.Windows.Forms.PictureBox();
            this.lbDate = new System.Windows.Forms.Label();
            this.panelCenter = new System.Windows.Forms.Panel();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btDone = new System.Windows.Forms.Button();
            this.btCancel = new System.Windows.Forms.Button();
            this.lbSession = new System.Windows.Forms.Label();
            this.flowLayoutPanelBookList = new System.Windows.Forms.FlowLayoutPanel();
            this.timerSession = new System.Windows.Forms.Timer(this.components);
            this.label1 = new System.Windows.Forms.Label();
            this.panelHead.SuspendLayout();
            this.pnNav.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spiner)).BeginInit();
            this.panelCenter.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // lbUsername
            // 
            this.lbUsername.AutoSize = true;
            this.lbUsername.Font = new System.Drawing.Font("Calibri", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbUsername.ForeColor = System.Drawing.Color.White;
            this.lbUsername.Location = new System.Drawing.Point(1500, 8);
            this.lbUsername.Name = "lbUsername";
            this.lbUsername.Size = new System.Drawing.Size(272, 35);
            this.lbUsername.TabIndex = 0;
            this.lbUsername.Text = "tramphse@gmail.com";
            // 
            // lbIntruction
            // 
            this.lbIntruction.AutoSize = true;
            this.lbIntruction.Font = new System.Drawing.Font("UD Digi Kyokasho NK-R", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbIntruction.Location = new System.Drawing.Point(33, 89);
            this.lbIntruction.Name = "lbIntruction";
            this.lbIntruction.Size = new System.Drawing.Size(634, 33);
            this.lbIntruction.TabIndex = 1;
            this.lbIntruction.Text = "Place book(s) on the scanner to check out";
            // 
            // txtBookRFID
            // 
            this.txtBookRFID.Location = new System.Drawing.Point(784, 43);
            this.txtBookRFID.Name = "txtBookRFID";
            this.txtBookRFID.Size = new System.Drawing.Size(299, 22);
            this.txtBookRFID.TabIndex = 4;
            this.txtBookRFID.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtBookRFID_KeyDown);
            // 
            // panelHead
            // 
            this.panelHead.Controls.Add(this.pnNav);
            this.panelHead.Controls.Add(this.spiner);
            this.panelHead.Controls.Add(this.lbIntruction);
            this.panelHead.Controls.Add(this.lbDate);
            this.panelHead.Dock = System.Windows.Forms.DockStyle.Top;
            this.panelHead.Location = new System.Drawing.Point(0, 0);
            this.panelHead.Name = "panelHead";
            this.panelHead.Size = new System.Drawing.Size(1778, 236);
            this.panelHead.TabIndex = 5;
            // 
            // pnNav
            // 
            this.pnNav.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.pnNav.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.pnNav.Controls.Add(this.label1);
            this.pnNav.Controls.Add(this.lbUsername);
            this.pnNav.Location = new System.Drawing.Point(1, 1);
            this.pnNav.Name = "pnNav";
            this.pnNav.Size = new System.Drawing.Size(1775, 49);
            this.pnNav.TabIndex = 6;
            // 
            // spiner
            // 
            this.spiner.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.spiner.Image = global::LibrarySelfCheckOut.Properties.Resources.Spinner_trans__1_;
            this.spiner.Location = new System.Drawing.Point(838, 159);
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
            this.lbDate.Location = new System.Drawing.Point(35, 159);
            this.lbDate.Name = "lbDate";
            this.lbDate.Size = new System.Drawing.Size(223, 24);
            this.lbDate.TabIndex = 3;
            this.lbDate.Text = "Date: 22 Dec, 2020";
            // 
            // panelCenter
            // 
            this.panelCenter.Controls.Add(this.panel1);
            this.panelCenter.Controls.Add(this.flowLayoutPanelBookList);
            this.panelCenter.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelCenter.Location = new System.Drawing.Point(0, 236);
            this.panelCenter.Name = "panelCenter";
            this.panelCenter.Size = new System.Drawing.Size(1778, 693);
            this.panelCenter.TabIndex = 6;
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.txtBookRFID);
            this.panel1.Controls.Add(this.btDone);
            this.panel1.Controls.Add(this.btCancel);
            this.panel1.Controls.Add(this.lbSession);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panel1.Location = new System.Drawing.Point(0, 593);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1778, 100);
            this.panel1.TabIndex = 8;
            // 
            // btDone
            // 
            this.btDone.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btDone.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(8)))), ((int)(((byte)(55)))), ((int)(((byte)(107)))));
            this.btDone.FlatAppearance.BorderSize = 0;
            this.btDone.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btDone.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.btDone.ForeColor = System.Drawing.Color.White;
            this.btDone.Location = new System.Drawing.Point(1527, 29);
            this.btDone.Name = "btDone";
            this.btDone.Size = new System.Drawing.Size(199, 47);
            this.btDone.TabIndex = 2;
            this.btDone.Text = "CHECK OUT";
            this.btDone.UseMnemonic = false;
            this.btDone.UseVisualStyleBackColor = false;
            this.btDone.Click += new System.EventHandler(this.btLogout_Click);
            // 
            // btCancel
            // 
            this.btCancel.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btCancel.BackColor = System.Drawing.Color.DarkGray;
            this.btCancel.FlatAppearance.BorderSize = 0;
            this.btCancel.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btCancel.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.btCancel.ForeColor = System.Drawing.Color.White;
            this.btCancel.Location = new System.Drawing.Point(1295, 29);
            this.btCancel.Name = "btCancel";
            this.btCancel.Size = new System.Drawing.Size(199, 47);
            this.btCancel.TabIndex = 7;
            this.btCancel.Text = "CANCEL";
            this.btCancel.UseMnemonic = false;
            this.btCancel.UseVisualStyleBackColor = false;
            this.btCancel.Click += new System.EventHandler(this.btCancel_Click);
            // 
            // lbSession
            // 
            this.lbSession.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.lbSession.AutoSize = true;
            this.lbSession.Font = new System.Drawing.Font("Calibri", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbSession.ForeColor = System.Drawing.Color.Firebrick;
            this.lbSession.Location = new System.Drawing.Point(30, 21);
            this.lbSession.Name = "lbSession";
            this.lbSession.Size = new System.Drawing.Size(388, 49);
            this.lbSession.TabIndex = 5;
            this.lbSession.Text = "SESSION TIMEOUT: 30";
            // 
            // flowLayoutPanelBookList
            // 
            this.flowLayoutPanelBookList.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)));
            this.flowLayoutPanelBookList.AutoScroll = true;
            this.flowLayoutPanelBookList.Location = new System.Drawing.Point(39, 15);
            this.flowLayoutPanelBookList.Name = "flowLayoutPanelBookList";
            this.flowLayoutPanelBookList.Size = new System.Drawing.Size(1687, 572);
            this.flowLayoutPanelBookList.TabIndex = 0;
            // 
            // timerSession
            // 
            this.timerSession.Enabled = true;
            this.timerSession.Interval = 1000;
            this.timerSession.Tick += new System.EventHandler(this.sessionTimer_Tick);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Calibri", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.label1.ForeColor = System.Drawing.Color.White;
            this.label1.Location = new System.Drawing.Point(32, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(253, 35);
            this.label1.TabIndex = 1;
            this.label1.Text = "CHECK-OUT SERVICE";
            // 
            // CheckOutForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(1778, 929);
            this.Controls.Add(this.panelCenter);
            this.Controls.Add(this.panelHead);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "CheckOutForm";
            this.Text = "SMART LIBRARY";
            this.panelHead.ResumeLayout(false);
            this.panelHead.PerformLayout();
            this.pnNav.ResumeLayout(false);
            this.pnNav.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spiner)).EndInit();
            this.panelCenter.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label lbUsername;
        private System.Windows.Forms.Label lbIntruction;
        private System.Windows.Forms.TextBox txtBookRFID;
        private System.Windows.Forms.Panel panelHead;
        private System.Windows.Forms.Panel panelCenter;
        private System.Windows.Forms.FlowLayoutPanel flowLayoutPanelBookList;
        private System.Windows.Forms.Button btDone;
        private System.Windows.Forms.Timer timerSession;
        private System.Windows.Forms.Label lbSession;
        private System.Windows.Forms.PictureBox spiner;
        private System.Windows.Forms.Label lbDate;
        private System.Windows.Forms.Button btCancel;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Panel pnNav;
        private System.Windows.Forms.Label label1;
    }
}