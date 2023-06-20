namespace CRUD
{
    partial class CadastroDePecas
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
            button1 = new Button();
            button2 = new Button();
            categoria = new Label();
            nome = new Label();
            descricao = new Label();
            dataFabricacao = new Label();
            estoque = new Label();
            textBox1 = new TextBox();
            textBox6 = new TextBox();
            textBox2 = new TextBox();
            dateTimePicker1 = new DateTimePicker();
            inputEstoque = new TextBox();
            SuspendLayout();
            // 
            // button1
            // 
            button1.Location = new Point(173, 289);
            button1.Name = "button1";
            button1.Size = new Size(87, 26);
            button1.TabIndex = 0;
            button1.Text = "Salvar";
            button1.UseVisualStyleBackColor = true;
            button1.Click += AoClicarEmSalvar;
            // 
            // button2
            // 
            button2.Location = new Point(266, 289);
            button2.Name = "button2";
            button2.Size = new Size(87, 26);
            button2.TabIndex = 1;
            button2.Text = "Cancelar";
            button2.UseVisualStyleBackColor = true;
            button2.Click += AoClicarCancelar;
            // 
            // categoria
            // 
            categoria.AutoSize = true;
            categoria.Location = new Point(25, 35);
            categoria.Name = "categoria";
            categoria.Size = new Size(58, 15);
            categoria.TabIndex = 2;
            categoria.Text = "Categoria";
            // 
            // nome
            // 
            nome.AutoSize = true;
            nome.Location = new Point(25, 77);
            nome.Name = "nome";
            nome.Size = new Size(40, 15);
            nome.TabIndex = 3;
            nome.Text = "Nome";
            // 
            // descricao
            // 
            descricao.AutoSize = true;
            descricao.Location = new Point(25, 119);
            descricao.Name = "descricao";
            descricao.Size = new Size(58, 15);
            descricao.TabIndex = 4;
            descricao.Text = "Descrição";
            // 
            // dataFabricacao
            // 
            dataFabricacao.AutoSize = true;
            dataFabricacao.Location = new Point(203, 35);
            dataFabricacao.Name = "dataFabricacao";
            dataFabricacao.Size = new Size(107, 15);
            dataFabricacao.TabIndex = 5;
            dataFabricacao.Text = "Data de Fabricação";
            // 
            // estoque
            // 
            estoque.AutoSize = true;
            estoque.Location = new Point(203, 77);
            estoque.Name = "estoque";
            estoque.Size = new Size(49, 15);
            estoque.TabIndex = 6;
            estoque.Text = "Estoque";
            // 
            // textBox1
            // 
            textBox1.Location = new Point(25, 137);
            textBox1.Multiline = true;
            textBox1.Name = "textBox1";
            textBox1.Size = new Size(150, 69);
            textBox1.TabIndex = 7;
            // 
            // textBox6
            // 
            textBox6.HideSelection = false;
            textBox6.Location = new Point(25, 53);
            textBox6.Multiline = true;
            textBox6.Name = "textBox6";
            textBox6.Size = new Size(150, 21);
            textBox6.TabIndex = 12;
            // 
            // textBox2
            // 
            textBox2.Location = new Point(25, 95);
            textBox2.Multiline = true;
            textBox2.Name = "textBox2";
            textBox2.Size = new Size(150, 21);
            textBox2.TabIndex = 13;
            // 
            // dateTimePicker1
            // 
            dateTimePicker1.Location = new Point(203, 51);
            dateTimePicker1.Name = "dateTimePicker1";
            dateTimePicker1.Size = new Size(150, 23);
            dateTimePicker1.TabIndex = 16;
            // 
            // inputEstoque
            // 
            inputEstoque.Location = new Point(203, 95);
            inputEstoque.Name = "inputEstoque";
            inputEstoque.Size = new Size(150, 23);
            inputEstoque.TabIndex = 18;
            inputEstoque.KeyPress += PermitirApenasNumeros;
            // 
            // CadastroDePecas
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(365, 327);
            Controls.Add(inputEstoque);
            Controls.Add(dateTimePicker1);
            Controls.Add(textBox2);
            Controls.Add(textBox6);
            Controls.Add(textBox1);
            Controls.Add(estoque);
            Controls.Add(dataFabricacao);
            Controls.Add(descricao);
            Controls.Add(nome);
            Controls.Add(categoria);
            Controls.Add(button2);
            Controls.Add(button1);
            Name = "CadastroDePecas";
            Text = "Cadastro de Peças";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button button1;
        private Button button2;
        private Label categoria;
        private Label nome;
        private Label descricao;
        private Label dataFabricacao;
        private Label estoque;
        private TextBox textBox1;
        private TextBox textBox6;
        private TextBox textBox2;
        private DateTimePicker dateTimePicker1;
        private TextBox inputEstoque;
    }
}