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

        private void CadastroDePecas_Load(object sender, EventArgs e)
        {

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

            _peca = pecaParaAdicionar;

            Close();
        }

        private void AoClicarCancelar(object sender, EventArgs e)
        {
            Close();
        }
    }
}
