namespace DropBoxUI
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
            this.panel2 = new System.Windows.Forms.Panel();
            this.lbFine = new System.Windows.Forms.Label();
            this.lbOverdueDay = new System.Windows.Forms.Label();
            this.lbBorrower = new System.Windows.Forms.Label();
            this.lbReturnedAt = new System.Windows.Forms.Label();
            this.lbGroup = new System.Windows.Forms.Label();
            this.lbAuthors = new System.Windows.Forms.Label();
            this.lbEdition = new System.Windows.Forms.Label();
            this.lbTitle = new System.Windows.Forms.Label();
            this.picBook = new System.Windows.Forms.PictureBox();
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.picBook)).BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.panel2);
            this.panel1.Controls.Add(this.lbGroup);
            this.panel1.Controls.Add(this.lbAuthors);
            this.panel1.Controls.Add(this.lbEdition);
            this.panel1.Controls.Add(this.lbTitle);
            this.panel1.Controls.Add(this.picBook);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1590, 170);
            this.panel1.TabIndex = 1;
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.lbFine);
            this.panel2.Controls.Add(this.lbOverdueDay);
            this.panel2.Controls.Add(this.lbBorrower);
            this.panel2.Controls.Add(this.lbReturnedAt);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Right;
            this.panel2.Location = new System.Drawing.Point(855, 0);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(735, 170);
            this.panel2.TabIndex = 10;
            // 
            // lbFine
            // 
            this.lbFine.AutoSize = true;
            this.lbFine.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbFine.Location = new System.Drawing.Point(12, 77);
            this.lbFine.Name = "lbFine";
            this.lbFine.Size = new System.Drawing.Size(136, 24);
            this.lbFine.TabIndex = 2;
            this.lbFine.Text = "Fine: 2000 VND";
            // 
            // lbOverdueDay
            // 
            this.lbOverdueDay.AutoSize = true;
            this.lbOverdueDay.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbOverdueDay.Location = new System.Drawing.Point(12, 44);
            this.lbOverdueDay.Name = "lbOverdueDay";
            this.lbOverdueDay.Size = new System.Drawing.Size(157, 24);
            this.lbOverdueDay.TabIndex = 1;
            this.lbOverdueDay.Text = "Overdue Day(s): 5";
            // 
            // lbBorrower
            // 
            this.lbBorrower.AutoSize = true;
            this.lbBorrower.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbBorrower.Location = new System.Drawing.Point(12, 11);
            this.lbBorrower.Name = "lbBorrower";
            this.lbBorrower.Size = new System.Drawing.Size(138, 24);
            this.lbBorrower.TabIndex = 9;
            this.lbBorrower.Text = "Borrower: tram";
            // 
            // lbReturnedAt
            // 
            this.lbReturnedAt.AutoSize = true;
            this.lbReturnedAt.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbReturnedAt.Location = new System.Drawing.Point(12, 109);
            this.lbReturnedAt.Name = "lbReturnedAt";
            this.lbReturnedAt.Size = new System.Drawing.Size(263, 24);
            this.lbReturnedAt.TabIndex = 0;
            this.lbReturnedAt.Text = "Return At: 2021/0202 00:00:00";
            // 
            // lbGroup
            // 
            this.lbGroup.AutoSize = true;
            this.lbGroup.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbGroup.Location = new System.Drawing.Point(154, 109);
            this.lbGroup.Name = "lbGroup";
            this.lbGroup.Size = new System.Drawing.Size(68, 24);
            this.lbGroup.TabIndex = 8;
            this.lbGroup.Text = "Group:";
            // 
            // lbAuthors
            // 
            this.lbAuthors.AutoSize = true;
            this.lbAuthors.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbAuthors.Location = new System.Drawing.Point(154, 77);
            this.lbAuthors.Name = "lbAuthors";
            this.lbAuthors.Size = new System.Drawing.Size(94, 24);
            this.lbAuthors.TabIndex = 7;
            this.lbAuthors.Text = "Author(s):";
            // 
            // lbEdition
            // 
            this.lbEdition.AutoSize = true;
            this.lbEdition.Font = new System.Drawing.Font("Calibri", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbEdition.Location = new System.Drawing.Point(154, 44);
            this.lbEdition.Name = "lbEdition";
            this.lbEdition.Size = new System.Drawing.Size(89, 24);
            this.lbEdition.TabIndex = 6;
            this.lbEdition.Text = "Edition: 2";
            // 
            // lbTitle
            // 
            this.lbTitle.AutoSize = true;
            this.lbTitle.Font = new System.Drawing.Font("Calibri", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(163)));
            this.lbTitle.Location = new System.Drawing.Point(153, 8);
            this.lbTitle.Name = "lbTitle";
            this.lbTitle.Size = new System.Drawing.Size(190, 29);
            this.lbTitle.TabIndex = 5;
            this.lbTitle.Text = "The Hobbit - 2 edt";
            // 
            // picBook
            // 
            this.picBook.Image = global::DropBoxUI.Properties.Resources._130304;
            this.picBook.Location = new System.Drawing.Point(15, 5);
            this.picBook.Name = "picBook";
            this.picBook.Size = new System.Drawing.Size(120, 160);
            this.picBook.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.picBook.TabIndex = 1;
            this.picBook.TabStop = false;
            // 
            // BookReturnItem
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.WhiteSmoke;
            this.Controls.Add(this.panel1);
            this.Name = "BookReturnItem";
            this.Size = new System.Drawing.Size(1590, 170);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.picBook)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Label lbFine;
        private System.Windows.Forms.Label lbOverdueDay;
        private System.Windows.Forms.Label lbBorrower;
        private System.Windows.Forms.Label lbReturnedAt;
        private System.Windows.Forms.Label lbGroup;
        private System.Windows.Forms.Label lbAuthors;
        private System.Windows.Forms.Label lbEdition;
        private System.Windows.Forms.Label lbTitle;
        private System.Windows.Forms.PictureBox picBook;
    }
}
