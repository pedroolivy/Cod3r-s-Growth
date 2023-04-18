namespace CRUD
{
    public partial class CadastroDePecas : Form
    {
        public Peca _peca = new();

        public CadastroDePecas(Peca novaPeca)
        {
            InitializeComponent();

            //criar uma nova peça
            _peca = new Peca();
        }

        public CadastroDePecas()
        {
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

            this.Close();
        }
    }
}
