using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Text.RegularExpressions;
using System.Windows.Forms;

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
            //Validar Campos

            var pecaParaAdicionar = new Peca()
            {
                Nome = textBox2.Text,
                Categoria = textBox6.Text,
                Descricao = textBox1.Text,
                Estoque = int.Parse(textBox4.Text),
                DataDeFabricacao = dateTimePicker1.Value,
            };

            try
            {

                var validador = new Servico();
                var resultado = validador.ValidarCampos(pecaParaAdicionar);

                if(resultado != null)
                {
                    MessageBox.Show(resultado);
                    return;
                }
                _peca = pecaParaAdicionar;

                DialogResult = DialogResult.OK;

                Close();

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);               
            }
           
        }
        private void AoClicarCancelar(object sender, EventArgs e)
        {
            DialogResult = DialogResult.Cancel;

            Close();
        }
    }
}
