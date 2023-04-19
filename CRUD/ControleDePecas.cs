using System.Windows.Forms;

namespace CRUD
{
    public partial class ControleDePecas : Form
    {   
        public int _proximoId;
        public  List<Peca> listaPecas = new();
        
        public ControleDePecas()
        {
            InitializeComponent();
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

        private void AtualizarLista()
        {
            dataGridView2.DataSource = null;
            dataGridView2.DataSource = listaPecas;
        }

        private void aoEditar_Click(object sender, EventArgs e)
        {
            var id = int.Parse(dataGridView2.SelectedRows[0].Cells[0].Value.ToString());
            var peca = listaPecas.Find(x => x.Id == id);

            if (id != 1) 
            {
                
            }
            else
            {
                CadastroDePecas cadastroDePecas = new CadastroDePecas(null);
                cadastroDePecas.ShowDialog();
            }
            

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
