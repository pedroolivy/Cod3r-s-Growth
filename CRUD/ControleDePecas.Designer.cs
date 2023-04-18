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
            this.components = new System.ComponentModel.Container();
            this.aoAdicionar = new System.Windows.Forms.Button();
            this.aoRemover = new System.Windows.Forms.Button();
            this.aoEditar = new System.Windows.Forms.Button();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.idDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nomeDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.categoriaDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.descricaoDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.estoqueDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.dataDeFabricacaoDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.pecaBindingSource = new System.Windows.Forms.BindingSource(this.components);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pecaBindingSource)).BeginInit();
            this.SuspendLayout();
            // 
            // aoAdicionar
            // 
            this.aoAdicionar.Location = new System.Drawing.Point(391, 241);
            this.aoAdicionar.Name = "aoAdicionar";
            this.aoAdicionar.Size = new System.Drawing.Size(86, 25);
            this.aoAdicionar.TabIndex = 0;
            this.aoAdicionar.Text = "Adiconar";
            this.aoAdicionar.UseVisualStyleBackColor = true;
            this.aoAdicionar.Click += new System.EventHandler(this.AoAdicionar_Click);
            // 
            // aoRemover
            // 
            this.aoRemover.Location = new System.Drawing.Point(576, 240);
            this.aoRemover.Name = "aoRemover";
            this.aoRemover.Size = new System.Drawing.Size(75, 26);
            this.aoRemover.TabIndex = 1;
            this.aoRemover.Text = "Remover";
            this.aoRemover.UseVisualStyleBackColor = true;
            this.aoRemover.Click += new System.EventHandler(this.AoRemover_Click);
            // 
            // aoEditar
            // 
            this.aoEditar.Location = new System.Drawing.Point(483, 240);
            this.aoEditar.Name = "aoEditar";
            this.aoEditar.Size = new System.Drawing.Size(87, 26);
            this.aoEditar.TabIndex = 2;
            this.aoEditar.Text = "Editar";
            this.aoEditar.UseVisualStyleBackColor = true;
            this.aoEditar.Click += new System.EventHandler(this.aoEditar_Click);
            // 
            // dataGridView1
            // 
            this.dataGridView1.AutoGenerateColumns = false;
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.idDataGridViewTextBoxColumn,
            this.nomeDataGridViewTextBoxColumn,
            this.categoriaDataGridViewTextBoxColumn,
            this.descricaoDataGridViewTextBoxColumn,
            this.estoqueDataGridViewTextBoxColumn,
            this.dataDeFabricacaoDataGridViewTextBoxColumn});
            this.dataGridView1.DataSource = this.pecaBindingSource;
            this.dataGridView1.Location = new System.Drawing.Point(12, 12);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowTemplate.Height = 25;
            this.dataGridView1.Size = new System.Drawing.Size(645, 222);
            this.dataGridView1.TabIndex = 3;
            this.dataGridView1.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellContentClick);
            // 
            // idDataGridViewTextBoxColumn
            // 
            this.idDataGridViewTextBoxColumn.DataPropertyName = "Id";
            this.idDataGridViewTextBoxColumn.HeaderText = "Id";
            this.idDataGridViewTextBoxColumn.Name = "idDataGridViewTextBoxColumn";
            // 
            // nomeDataGridViewTextBoxColumn
            // 
            this.nomeDataGridViewTextBoxColumn.DataPropertyName = "Nome";
            this.nomeDataGridViewTextBoxColumn.HeaderText = "Nome";
            this.nomeDataGridViewTextBoxColumn.Name = "nomeDataGridViewTextBoxColumn";
            // 
            // categoriaDataGridViewTextBoxColumn
            // 
            this.categoriaDataGridViewTextBoxColumn.DataPropertyName = "Categoria";
            this.categoriaDataGridViewTextBoxColumn.HeaderText = "Categoria";
            this.categoriaDataGridViewTextBoxColumn.Name = "categoriaDataGridViewTextBoxColumn";
            // 
            // descricaoDataGridViewTextBoxColumn
            // 
            this.descricaoDataGridViewTextBoxColumn.DataPropertyName = "Descricao";
            this.descricaoDataGridViewTextBoxColumn.HeaderText = "Descricao";
            this.descricaoDataGridViewTextBoxColumn.Name = "descricaoDataGridViewTextBoxColumn";
            // 
            // estoqueDataGridViewTextBoxColumn
            // 
            this.estoqueDataGridViewTextBoxColumn.DataPropertyName = "Estoque";
            this.estoqueDataGridViewTextBoxColumn.HeaderText = "Estoque";
            this.estoqueDataGridViewTextBoxColumn.Name = "estoqueDataGridViewTextBoxColumn";
            // 
            // dataDeFabricacaoDataGridViewTextBoxColumn
            // 
            this.dataDeFabricacaoDataGridViewTextBoxColumn.DataPropertyName = "DataDeFabricacao";
            this.dataDeFabricacaoDataGridViewTextBoxColumn.HeaderText = "DataDeFabricacao";
            this.dataDeFabricacaoDataGridViewTextBoxColumn.Name = "dataDeFabricacaoDataGridViewTextBoxColumn";
            // 
            // pecaBindingSource
            // 
            this.pecaBindingSource.DataSource = typeof(CRUD.Peca);
            // 
            // ControleDePecas
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(668, 272);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.aoEditar);
            this.Controls.Add(this.aoRemover);
            this.Controls.Add(this.aoAdicionar);
            this.Name = "ControleDePecas";
            this.Text = "Controle de Peças";
            this.Load += new System.EventHandler(this.ControleDePecas_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pecaBindingSource)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Button aoAdicionar;
        private Button aoRemover;
        private Button aoEditar;
        private DataGridView dataGridView1;
        private DataGridViewTextBoxColumn idDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn nomeDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn categoriaDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn descricaoDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn estoqueDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn dataDeFabricacaoDataGridViewTextBoxColumn;
        private BindingSource pecaBindingSource;
    }
}