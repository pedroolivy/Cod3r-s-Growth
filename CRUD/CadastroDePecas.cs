using System.ComponentModel.DataAnnotations;

namespace CRUD
{
    public partial class CadastroDePecas : Form
    {
        public Peca _peca = new();

        public CadastroDePecas(Peca peca)
        {
            InitializeComponent();

                if (peca == null)
                {
                    _peca = new Peca();
                }
                else
                {
                    textBox1.Text = peca.Descricao;
                    textBox2.Text = peca.Nome;
                    textBox4.Text = peca.Estoque.ToString();
                    textBox6.Text = peca.Categoria;
                    dateTimePicker1.Value = peca.DataDeFabricacao;
                }
        }

        private void AoClicarEmSalvar(object sender, EventArgs e)
        {
            var pecaParaAdicionar = new Peca()
            {
                Nome = textBox2.Text,
                Categoria = textBox6.Text,
                Descricao = textBox1.Text,
                Estoque = int.Parse(textBox4.Text),
                DataDeFabricacao = dateTimePicker1.Value,
            };

            if (textBox2.Text == string.Empty)
            {
                MessageBox.Show("campo Nome vazio!", "Informação", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                textBox2.BackColor = Color.Red;
            }
            else if (textBox6.Text == string.Empty)
            {
                MessageBox.Show("campo Categoria vazio!", "Informação", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                textBox6.BackColor = Color.Red;
            }
            else if (textBox1.Text == string.Empty)
            {
                MessageBox.Show("campo Descrição vazio!", "Informação", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                textBox1.BackColor = Color.Red;
            }
            else if (textBox4.Text == string.Empty)
            {
                MessageBox.Show("campo Estoque vazio!", "Informação", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                textBox4.BackColor = Color.Red;
            }

            else { 
                _peca = pecaParaAdicionar;

                Close();
            }

        }

        private void AoClicarCancelar(object sender, EventArgs e)
        {
            Close();
        }
    }
}
