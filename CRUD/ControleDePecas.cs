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
        }

        public int ObterProximoId()
        {
            return ++proximoId;
        }

        private void ControleDePecas_Load()
        {
            dataGridView1.DataSource = listaPecas;
        }

        private void AoAdicionar_Click(object sender, EventArgs e)
        {
            CadastroDePecas cadastroDePecas = new CadastroDePecas(new Peca());
            cadastroDePecas.ShowDialog();

            var pecaPreenchida = cadastroDePecas._peca;

            listaPecas.Add(pecaPreenchida);

            dataGridView1.DataSource = null;
            dataGridView1.DataSource = listaPecas;

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
    }  
}
