namespace CRUD
{
    public partial class ControleDePecas : Form
    {   
        public int _proximoId;
        public List<Peca> listaPecas = new();
        
        public ControleDePecas()
        {
            InitializeComponent();
            AtualizarLista();
        }      

        private void AtualizarLista()
        {
            dataGridView1.DataSource = null;
            dataGridView1.DataSource = listaPecas;
        }

        private void AoAdicionar_Click(object sender, EventArgs e)
        {
            CadastroDePecas cadastroDePecas = new CadastroDePecas(null);
            cadastroDePecas.ShowDialog();

            var pecaPreenchida = cadastroDePecas._peca;
            pecaPreenchida.Id = ObterProximoId();

            listaPecas.Add(pecaPreenchida);

            AtualizarLista();
        }

        private void AoRemover_Click(object sender, EventArgs e)
        {

        }

        private void aoEditar_Click(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void ControleDePecas_Load(object sender, EventArgs e)
        {
            
        }

        public int ObterProximoId()
        {
            return ++_proximoId;
        }
    }  
}
