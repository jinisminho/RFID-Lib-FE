namespace LibrarySelfCheckOut
{
    partial class ReturnForm
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
            this.panel1 = new System.Windows.Forms.Panel();
            this.txtBookCode = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.panel2 = new System.Windows.Forms.Panel();
            this.lbCurrentDate = new System.Windows.Forms.Label();
            this.pnBooksReturned = new System.Windows.Forms.FlowLayoutPanel();
            this.spiner = new System.Windows.Forms.PictureBox();
            this.panel3 = new System.Windows.Forms.Panel();
            this.btDone = new System.Windows.Forms.Button();
            this.lbSessionTimeOut = new System.Windows.Forms.Label();
            this.timerSessionTimeOut = new System.Windows.Forms.Timer(this.components);
            this.timerCallReturnAPI = new System.Windows.Forms.Timer(this.components);
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spiner)).BeginInit();
            this.panel3.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.txtBookCode);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1778, 100);
            this.panel1.TabIndex = 0;
            // 
            // txtBookCode
            // 
            this.txtBookCode.Location = new System.Drawing.Point(938, 41);
            this.txtBookCode.Name = "txtBookCode";
            this.txtBookCode.Size = new System.Drawing.Size(223, 22);
            this.txtBookCode.TabIndex = 3;
            this.txtBookCode.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtBookCode_KeyDown);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("UD Digi Kyokasho NP-B", 19.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.label1.Location = new System.Drawing.Point(39, 25);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(799, 38);
            this.label1.TabIndex = 2;
            this.label1.Text = "PLEASE PUT YOUR BOOKS ON THE SCANNER";
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.lbCurrentDate);
            this.panel2.Controls.Add(this.pnBooksReturned);
            this.panel2.Controls.Add(this.spiner);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(0, 100);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(1778, 829);
            this.panel2.TabIndex = 1;
            // 
            // lbCurrentDate
            // 
            this.lbCurrentDate.AutoSize = true;
            this.lbCurrentDate.Font = new System.Drawing.Font("UD Digi Kyokasho NP-R", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbCurrentDate.Location = new System.Drawing.Point(42, 18);
            this.lbCurrentDate.Name = "lbCurrentDate";
            this.lbCurrentDate.Size = new System.Drawing.Size(223, 24);
            this.lbCurrentDate.TabIndex = 4;
            this.lbCurrentDate.Text = "Date: 22 Dec, 2020";
            // 
            // pnBooksReturned
            // 
            this.pnBooksReturned.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.pnBooksReturned.AutoScroll = true;
            this.pnBooksReturned.Location = new System.Drawing.Point(46, 71);
            this.pnBooksReturned.Name = "pnBooksReturned";
            this.pnBooksReturned.Size = new System.Drawing.Size(1687, 561);
            this.pnBooksReturned.TabIndex = 1;
            // 
            // spiner
            // 
            this.spiner.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.spiner.Image = global::LibrarySelfCheckOut.Properties.Resources.Spinner_1s_200px;
            this.spiner.Location = new System.Drawing.Point(838, 0);
            this.spiner.Name = "spiner";
            this.spiner.Size = new System.Drawing.Size(100, 78);
            this.spiner.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.spiner.TabIndex = 0;
            this.spiner.TabStop = false;
            // 
            // panel3
            // 
            this.panel3.Controls.Add(this.btDone);
            this.panel3.Controls.Add(this.lbSessionTimeOut);
            this.panel3.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panel3.Location = new System.Drawing.Point(0, 829);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(1778, 100);
            this.panel3.TabIndex = 2;
            // 
            // btDone
            // 
            this.btDone.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btDone.BackColor = System.Drawing.Color.RoyalBlue;
            this.btDone.FlatAppearance.BorderSize = 0;
            this.btDone.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btDone.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.btDone.ForeColor = System.Drawing.Color.White;
            this.btDone.Location = new System.Drawing.Point(1534, 22);
            this.btDone.Name = "btDone";
            this.btDone.Size = new System.Drawing.Size(199, 47);
            this.btDone.TabIndex = 7;
            this.btDone.Text = "DONE";
            this.btDone.UseMnemonic = false;
            this.btDone.UseVisualStyleBackColor = false;
            this.btDone.Click += new System.EventHandler(this.btDone_Click);
            // 
            // lbSessionTimeOut
            // 
            this.lbSessionTimeOut.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.lbSessionTimeOut.AutoSize = true;
            this.lbSessionTimeOut.Font = new System.Drawing.Font("Calibri", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbSessionTimeOut.ForeColor = System.Drawing.Color.Firebrick;
            this.lbSessionTimeOut.Location = new System.Drawing.Point(47, 25);
            this.lbSessionTimeOut.Name = "lbSessionTimeOut";
            this.lbSessionTimeOut.Size = new System.Drawing.Size(388, 49);
            this.lbSessionTimeOut.TabIndex = 6;
            this.lbSessionTimeOut.Text = "SESSION TIMEOUT: 30";
            // 
            // timerSessionTimeOut
            // 
            this.timerSessionTimeOut.Enabled = true;
            this.timerSessionTimeOut.Interval = 1000;
            this.timerSessionTimeOut.Tick += new System.EventHandler(this.timerSessionTimeOut_Tick);
            // 
            // timerCallReturnAPI
            // 
            this.timerCallReturnAPI.Interval = 10000;
            this.timerCallReturnAPI.Tick += new System.EventHandler(this.timerCallReturnAPI_Tick);
            // 
            // ReturnForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1778, 929);
            this.Controls.Add(this.panel3);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.panel1);
            this.Name = "ReturnForm";
            this.Text = "ReturnForm";
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spiner)).EndInit();
            this.panel3.ResumeLayout(false);
            this.panel3.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.PictureBox spiner;
        private System.Windows.Forms.FlowLayoutPanel pnBooksReturned;
        private System.Windows.Forms.Label lbSessionTimeOut;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btDone;
        private System.Windows.Forms.TextBox txtBookCode;
        private System.Windows.Forms.Label lbCurrentDate;
        private System.Windows.Forms.Timer timerSessionTimeOut;
        private System.Windows.Forms.Timer timerCallReturnAPI;
    }
}