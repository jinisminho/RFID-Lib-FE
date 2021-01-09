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
            this.panel1 = new System.Windows.Forms.Panel();
            this.spliter1 = new System.Windows.Forms.Panel();
            this.lbBookDescription = new System.Windows.Forms.Label();
            this.lbTitle = new System.Windows.Forms.Label();
            this.panelNo.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panelNo
            // 
            this.panelNo.Controls.Add(this.lbIndex);
            this.panelNo.Dock = System.Windows.Forms.DockStyle.Left;
            this.panelNo.Location = new System.Drawing.Point(0, 0);
            this.panelNo.Name = "panelNo";
            this.panelNo.Size = new System.Drawing.Size(135, 95);
            this.panelNo.TabIndex = 0;
            // 
            // lbIndex
            // 
            this.lbIndex.AutoSize = true;
            this.lbIndex.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbIndex.Location = new System.Drawing.Point(46, 39);
            this.lbIndex.Name = "lbIndex";
            this.lbIndex.Size = new System.Drawing.Size(25, 24);
            this.lbIndex.TabIndex = 0;
            this.lbIndex.Text = "1.";
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.spliter1);
            this.panel1.Controls.Add(this.lbBookDescription);
            this.panel1.Controls.Add(this.lbTitle);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(135, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(798, 95);
            this.panel1.TabIndex = 1;
            // 
            // spliter1
            // 
            this.spliter1.BackColor = System.Drawing.SystemColors.Control;
            this.spliter1.Location = new System.Drawing.Point(0, 0);
            this.spliter1.Name = "spliter1";
            this.spliter1.Size = new System.Drawing.Size(2, 96);
            this.spliter1.TabIndex = 3;
            // 
            // lbBookDescription
            // 
            this.lbBookDescription.AutoSize = true;
            this.lbBookDescription.Font = new System.Drawing.Font("Calibri", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbBookDescription.Location = new System.Drawing.Point(27, 49);
            this.lbBookDescription.MaximumSize = new System.Drawing.Size(700, 0);
            this.lbBookDescription.Name = "lbBookDescription";
            this.lbBookDescription.Size = new System.Drawing.Size(697, 69);
            this.lbBookDescription.TabIndex = 1;
            this.lbBookDescription.Text = "Book Authors - nth edition - 201ggggggggggggggggggggggggggggggggggggggggggggggggg" +
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0";
            // 
            // lbTitle
            // 
            this.lbTitle.AutoSize = true;
            this.lbTitle.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbTitle.Location = new System.Drawing.Point(26, 5);
            this.lbTitle.MaximumSize = new System.Drawing.Size(700, 0);
            this.lbTitle.Name = "lbTitle";
            this.lbTitle.Size = new System.Drawing.Size(696, 72);
            this.lbTitle.TabIndex = 0;
            this.lbTitle.Text = "Book Titlehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh jhkkkkkkk" +
    "kkkkkkkkkkkkkkkkkk";
            // 
            // BookItem
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.panelNo);
            this.Name = "BookItem";
            this.Size = new System.Drawing.Size(933, 95);
            this.Load += new System.EventHandler(this.BookItem_Load);
            this.panelNo.ResumeLayout(false);
            this.panelNo.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panelNo;
        private System.Windows.Forms.Label lbIndex;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label lbBookDescription;
        private System.Windows.Forms.Label lbTitle;
        private System.Windows.Forms.Panel spliter1;
    }
}
