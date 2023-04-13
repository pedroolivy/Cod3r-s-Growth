namespace CRUD
{
    partial class ControleDePecas
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
            this.aoAdicionar = new System.Windows.Forms.Button();
            this.aoRemover = new System.Windows.Forms.Button();
            this.aoEditar = new System.Windows.Forms.Button();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // aoAdicionar
            // 
            this.aoAdicionar.Location = new System.Drawing.Point(148, 372);
            this.aoAdicionar.Name = "aoAdicionar";
            this.aoAdicionar.Size = new System.Drawing.Size(140, 25);
            this.aoAdicionar.TabIndex = 0;
            this.aoAdicionar.Text = "Adiconar";
            this.aoAdicionar.UseVisualStyleBackColor = true;
            this.aoAdicionar.Click += new System.EventHandler(this.aoAdicionar_Click);
            // 
            // aoRemover
            // 
            this.aoRemover.Location = new System.Drawing.Point(441, 373);
            this.aoRemover.Name = "aoRemover";
            this.aoRemover.Size = new System.Drawing.Size(129, 26);
            this.aoRemover.TabIndex = 1;
            this.aoRemover.Text = "Remover";
            this.aoRemover.UseVisualStyleBackColor = true;
            this.aoRemover.Click += new System.EventHandler(this.aoRemover_Click);
            // 
            // aoEditar
            // 
            this.aoEditar.Location = new System.Drawing.Point(294, 373);
            this.aoEditar.Name = "aoEditar";
            this.aoEditar.Size = new System.Drawing.Size(141, 26);
            this.aoEditar.TabIndex = 2;
            this.aoEditar.Text = "Editar";
            this.aoEditar.UseVisualStyleBackColor = true;
            this.aoEditar.Click += new System.EventHandler(this.aoEditar_Click);
            // 
            // dataGridView1
            // 
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Location = new System.Drawing.Point(12, 12);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowTemplate.Height = 25;
            this.dataGridView1.Size = new System.Drawing.Size(558, 354);
            this.dataGridView1.TabIndex = 3;
            // 
            // ControleDePecas
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(582, 403);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.aoEditar);
            this.Controls.Add(this.aoRemover);
            this.Controls.Add(this.aoAdicionar);
            this.Name = "ControleDePecas";
            this.Text = "Controle de Peças";
            this.Load += new System.EventHandler(this.ControleDePecas_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Button aoAdicionar;
        private Button aoRemover;
        private Button aoEditar;
        private DataGridView dataGridView1;
    }
}