namespace CRUD
{
    public partial class ControleDePecas : Form
    {   
        public List<Peca> listaPecas = new();
        public int proximoId = 0;
        
        public ControleDePecas()
        {
            InitializeComponent();
            recebeLista();
            ControleDePecas_Load();
        }

        public void recebeLista()
        {
            listaPecas.Add(new Peca(ObterProximoId(), "Parafuso", "Ferramenta", "Usada", 5));
            listaPecas.Add(new Peca(ObterProximoId(), "teste", "Ferramenta", "Seminova", 2));
            listaPecas.Add(new Peca(ObterProximoId(), "Prego", "Ferramenta", "Gold", 15));
            listaPecas.Add(new Peca(ObterProximoId(), "teste", "Ferramenta", "Usada", 25));
        }

        public int ObterProximoId()
        {
            return ++proximoId;
        }

        private void ControleDePecas_Load()
        {
            dataGridView1.DataSource = listaPecas;
        }

        private void aoAdicionar_Click(object sender, EventArgs e)
        {

        }

        private void aoRemover_Click(object sender, EventArgs e)
        {

        }

        private void aoEditar_Click(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
