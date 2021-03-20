namespace DropBoxUI
{
    partial class BookScannedItem
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
            this.lbGroup = new System.Windows.Forms.Label();
            this.lbAuthors = new System.Windows.Forms.Label();
            this.lbEdition = new System.Windows.Forms.Label();
            this.lbTitle = new System.Windows.Forms.Label();
            this.picBook = new System.Windows.Forms.PictureBox();
            ((System.ComponentModel.ISupportInitialize)(this.picBook)).BeginInit();
            this.SuspendLayout();
            // 
            // lbGroup
            // 
            this.lbGroup.AutoSize = true;
            this.lbGroup.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbGroup.Location = new System.Drawing.Point(149, 110);
            this.lbGroup.Name = "lbGroup";
            this.lbGroup.Size = new System.Drawing.Size(68, 24);
            this.lbGroup.TabIndex = 9;
            this.lbGroup.Text = "Group:";
            // 
            // lbAuthors
            // 
            this.lbAuthors.AutoSize = true;
            this.lbAuthors.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbAuthors.Location = new System.Drawing.Point(149, 77);
            this.lbAuthors.Name = "lbAuthors";
            this.lbAuthors.Size = new System.Drawing.Size(94, 24);
            this.lbAuthors.TabIndex = 8;
            this.lbAuthors.Text = "Author(s):";
            // 
            // lbEdition
            // 
            this.lbEdition.AutoSize = true;
            this.lbEdition.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbEdition.Location = new System.Drawing.Point(149, 44);
            this.lbEdition.Name = "lbEdition";
            this.lbEdition.Size = new System.Drawing.Size(89, 24);
            this.lbEdition.TabIndex = 7;
            this.lbEdition.Text = "Edition: 2";
            // 
            // lbTitle
            // 
            this.lbTitle.AutoSize = true;
            this.lbTitle.Font = new System.Drawing.Font("Calibri", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbTitle.Location = new System.Drawing.Point(148, 7);
            this.lbTitle.Name = "lbTitle";
            this.lbTitle.Size = new System.Drawing.Size(190, 29);
            this.lbTitle.TabIndex = 6;
            this.lbTitle.Text = "The Hobbit - 2 edt";
            // 
            // picBook
            // 
            this.picBook.Location = new System.Drawing.Point(12, 5);
            this.picBook.Name = "picBook";
            this.picBook.Size = new System.Drawing.Size(120, 160);
            this.picBook.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.picBook.TabIndex = 5;
            this.picBook.TabStop = false;
            // 
            // BookScannedItem
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.WhiteSmoke;
            this.Controls.Add(this.lbGroup);
            this.Controls.Add(this.lbAuthors);
            this.Controls.Add(this.lbEdition);
            this.Controls.Add(this.lbTitle);
            this.Controls.Add(this.picBook);
            this.Name = "BookScannedItem";
            this.Size = new System.Drawing.Size(1590, 170);
            ((System.ComponentModel.ISupportInitialize)(this.picBook)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label lbGroup;
        private System.Windows.Forms.Label lbAuthors;
        private System.Windows.Forms.Label lbEdition;
        private System.Windows.Forms.Label lbTitle;
        private System.Windows.Forms.PictureBox picBook;
    }
}
