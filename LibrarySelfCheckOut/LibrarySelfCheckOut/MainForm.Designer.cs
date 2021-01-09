namespace LibrarySelfCheckOut
{
    partial class MainForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            this.panel1 = new System.Windows.Forms.Panel();
            this.label1 = new System.Windows.Forms.Label();
            this.pnBorrow = new System.Windows.Forms.Panel();
            this.pnReturn = new System.Windows.Forms.Panel();
            this.pcReturn = new System.Windows.Forms.PictureBox();
            this.pcBorrow = new System.Windows.Forms.PictureBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.lbBorrow = new System.Windows.Forms.Label();
            this.lbReturn = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            this.pnBorrow.SuspendLayout();
            this.pnReturn.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pcReturn)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pcBorrow)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.pnReturn);
            this.panel1.Controls.Add(this.pnBorrow);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 423);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1193, 506);
            this.panel1.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label1.AutoSize = true;
            this.label1.Cursor = System.Windows.Forms.Cursors.Arrow;
            this.label1.Font = new System.Drawing.Font("UD Digi Kyokasho NK-B", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.label1.ForeColor = System.Drawing.Color.RoyalBlue;
            this.label1.Location = new System.Drawing.Point(242, 42);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(674, 46);
            this.label1.TabIndex = 0;
            this.label1.Text = "WELCOME TO SMART LIBRARY";
            // 
            // pnBorrow
            // 
            this.pnBorrow.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.pnBorrow.BackColor = System.Drawing.Color.Snow;
            this.pnBorrow.Controls.Add(this.lbBorrow);
            this.pnBorrow.Controls.Add(this.pcBorrow);
            this.pnBorrow.Location = new System.Drawing.Point(327, 129);
            this.pnBorrow.Name = "pnBorrow";
            this.pnBorrow.Size = new System.Drawing.Size(209, 151);
            this.pnBorrow.TabIndex = 1;
            this.pnBorrow.MouseClick += new System.Windows.Forms.MouseEventHandler(this.pnBorrow_MouseClick);
            // 
            // pnReturn
            // 
            this.pnReturn.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.pnReturn.BackColor = System.Drawing.Color.Snow;
            this.pnReturn.Controls.Add(this.lbReturn);
            this.pnReturn.Controls.Add(this.pcReturn);
            this.pnReturn.Location = new System.Drawing.Point(659, 129);
            this.pnReturn.Name = "pnReturn";
            this.pnReturn.Size = new System.Drawing.Size(209, 151);
            this.pnReturn.TabIndex = 2;
            this.pnReturn.MouseClick += new System.Windows.Forms.MouseEventHandler(this.pnReturn_MouseClick);
            // 
            // pcReturn
            // 
            this.pcReturn.Image = global::LibrarySelfCheckOut.Properties.Resources.return_book;
            this.pcReturn.Location = new System.Drawing.Point(61, 11);
            this.pcReturn.Name = "pcReturn";
            this.pcReturn.Size = new System.Drawing.Size(100, 98);
            this.pcReturn.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pcReturn.TabIndex = 1;
            this.pcReturn.TabStop = false;
            this.pcReturn.Click += new System.EventHandler(this.pcReturn_Click);
            // 
            // pcBorrow
            // 
            this.pcBorrow.Image = global::LibrarySelfCheckOut.Properties.Resources.borrow_book;
            this.pcBorrow.Location = new System.Drawing.Point(52, 11);
            this.pcBorrow.Name = "pcBorrow";
            this.pcBorrow.Size = new System.Drawing.Size(100, 98);
            this.pcBorrow.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pcBorrow.TabIndex = 0;
            this.pcBorrow.TabStop = false;
            this.pcBorrow.Click += new System.EventHandler(this.pcBorrow_Click);
            // 
            // pictureBox1
            // 
            this.pictureBox1.Dock = System.Windows.Forms.DockStyle.Top;
            this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location = new System.Drawing.Point(0, 0);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(1193, 423);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 0;
            this.pictureBox1.TabStop = false;
            // 
            // lbBorrow
            // 
            this.lbBorrow.AutoSize = true;
            this.lbBorrow.Font = new System.Drawing.Font("UD Digi Kyokasho NP-B", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbBorrow.Location = new System.Drawing.Point(50, 114);
            this.lbBorrow.Name = "lbBorrow";
            this.lbBorrow.Size = new System.Drawing.Size(104, 24);
            this.lbBorrow.TabIndex = 1;
            this.lbBorrow.Text = "BORROW";
            this.lbBorrow.Click += new System.EventHandler(this.lbBorrow_Click);
            // 
            // lbReturn
            // 
            this.lbReturn.AutoSize = true;
            this.lbReturn.Font = new System.Drawing.Font("UD Digi Kyokasho NP-B", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbReturn.Location = new System.Drawing.Point(63, 114);
            this.lbReturn.Name = "lbReturn";
            this.lbReturn.Size = new System.Drawing.Size(98, 24);
            this.lbReturn.TabIndex = 2;
            this.lbReturn.Text = "RETURN";
            this.lbReturn.Click += new System.EventHandler(this.lbReturn_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1193, 929);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.pictureBox1);
            this.Name = "MainForm";
            this.Text = "MainForm";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.pnBorrow.ResumeLayout(false);
            this.pnBorrow.PerformLayout();
            this.pnReturn.ResumeLayout(false);
            this.pnReturn.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pcReturn)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pcBorrow)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Panel pnReturn;
        private System.Windows.Forms.Panel pnBorrow;
        private System.Windows.Forms.PictureBox pcBorrow;
        private System.Windows.Forms.PictureBox pcReturn;
        private System.Windows.Forms.Label lbReturn;
        private System.Windows.Forms.Label lbBorrow;
    }
}