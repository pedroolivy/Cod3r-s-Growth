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
            var linhaSelecionada = (int)dataGridView2.SelectedRows[0].Cells[0].RowIndex;
            var pecaSelecionada = (Peca)dataGridView2.Rows[linhaSelecionada].DataBoundItem;

            CadastroDePecas cadastroPeca = new CadastroDePecas(pecaSelecionada);
            cadastroPeca.ShowDialog();


            //pegar os novos valores atualizados 

            var pecaAtualizada = cadastroPeca._peca;
            pecaAtualizada.Id = linhaSelecionada;

            //salvar esse novo valor sobrepondo o valor já existente

            listaPecas[linhaSelecionada] = pecaAtualizada;

            //pegar o item da lista e substituir pelo valor atualizado

            AtualizarLista();

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
