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
            this.lbWelcome = new System.Windows.Forms.Panel();
            this.lbReturn = new System.Windows.Forms.Label();
            this.lbBorrow = new System.Windows.Forms.Label();
            this.pcReturn = new System.Windows.Forms.PictureBox();
            this.pictureBox2 = new System.Windows.Forms.PictureBox();
            this.pcBorrow = new System.Windows.Forms.PictureBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.lbWelcome.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pcReturn)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pcBorrow)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // lbWelcome
            // 
            this.lbWelcome.BackColor = System.Drawing.Color.White;
            this.lbWelcome.Controls.Add(this.lbReturn);
            this.lbWelcome.Controls.Add(this.lbBorrow);
            this.lbWelcome.Controls.Add(this.pcReturn);
            this.lbWelcome.Controls.Add(this.pictureBox2);
            this.lbWelcome.Controls.Add(this.pcBorrow);
            this.lbWelcome.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lbWelcome.Location = new System.Drawing.Point(0, 474);
            this.lbWelcome.Name = "lbWelcome";
            this.lbWelcome.Size = new System.Drawing.Size(1193, 455);
            this.lbWelcome.TabIndex = 1;
            // 
            // lbReturn
            // 
            this.lbReturn.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbReturn.AutoSize = true;
            this.lbReturn.Font = new System.Drawing.Font("UD Digi Kyokasho NP-B", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbReturn.Location = new System.Drawing.Point(695, 366);
            this.lbReturn.Name = "lbReturn";
            this.lbReturn.Size = new System.Drawing.Size(98, 24);
            this.lbReturn.TabIndex = 2;
            this.lbReturn.Text = "RETURN";
            this.lbReturn.Click += new System.EventHandler(this.lbReturn_Click);
            // 
            // lbBorrow
            // 
            this.lbBorrow.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lbBorrow.AutoSize = true;
            this.lbBorrow.Font = new System.Drawing.Font("UD Digi Kyokasho NP-B", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(128)));
            this.lbBorrow.Location = new System.Drawing.Point(401, 366);
            this.lbBorrow.Name = "lbBorrow";
            this.lbBorrow.Size = new System.Drawing.Size(104, 24);
            this.lbBorrow.TabIndex = 1;
            this.lbBorrow.Text = "BORROW";
            this.lbBorrow.Click += new System.EventHandler(this.lbBorrow_Click);
            // 
            // pcReturn
            // 
            this.pcReturn.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.pcReturn.Image = global::LibrarySelfCheckOut.Properties.Resources.return_book;
            this.pcReturn.Location = new System.Drawing.Point(676, 215);
            this.pcReturn.Name = "pcReturn";
            this.pcReturn.Size = new System.Drawing.Size(133, 138);
            this.pcReturn.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pcReturn.TabIndex = 1;
            this.pcReturn.TabStop = false;
            this.pcReturn.Click += new System.EventHandler(this.pcReturn_Click);
            // 
            // pictureBox2
            // 
            this.pictureBox2.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.pictureBox2.Image = global::LibrarySelfCheckOut.Properties.Resources.welcome_dark;
            this.pictureBox2.Location = new System.Drawing.Point(3, 20);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = new System.Drawing.Size(1187, 69);
            this.pictureBox2.SizeMode = System.Windows.Forms.PictureBoxSizeMode.CenterImage;
            this.pictureBox2.TabIndex = 3;
            this.pictureBox2.TabStop = false;
            // 
            // pcBorrow
            // 
            this.pcBorrow.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.pcBorrow.Image = global::LibrarySelfCheckOut.Properties.Resources.borrow_book;
            this.pcBorrow.Location = new System.Drawing.Point(384, 215);
            this.pcBorrow.Name = "pcBorrow";
            this.pcBorrow.Size = new System.Drawing.Size(133, 138);
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
            this.pictureBox1.Size = new System.Drawing.Size(1193, 474);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 0;
            this.pictureBox1.TabStop = false;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(1193, 929);
            this.Controls.Add(this.lbWelcome);
            this.Controls.Add(this.pictureBox1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "MainForm";
            this.Text = "SMART LIBRARY";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.lbWelcome.ResumeLayout(false);
            this.lbWelcome.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pcReturn)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pcBorrow)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Panel lbWelcome;
        private System.Windows.Forms.PictureBox pcReturn;
        private System.Windows.Forms.Label lbReturn;
        private System.Windows.Forms.PictureBox pictureBox2;
        private System.Windows.Forms.Label lbBorrow;
        private System.Windows.Forms.PictureBox pcBorrow;
    }
}