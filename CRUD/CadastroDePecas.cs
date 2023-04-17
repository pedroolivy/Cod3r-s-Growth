namespace CRUD
{
    public partial class CadastroDePecas : Form
    {
        public CadastroDePecas()
        {
            InitializeComponent();
        }

        private void CadastroDePecas_Load(object sender, EventArgs e)
        {

        }

        private void AoClicarEmSalvar(object sender, EventArgs e)
        {
            //pegar o valor dentro de todos os campos e salvar dentro de um objeto - peça
            var peca = new Peca()
            {
                Nome = textBox2.Text,
                Categoria = textBox6.Text,
                Descricao = textBox1.Text,
                Estoque = int.Parse(textBox4.Text),
                DataDeFabricacao = dateTimePicker1.Value,
            };

            //adicionar peça dentro da lista
               
              

        }
    }
}
