namespace CRUD
{
    public partial class ControleDePecas : Form
    {
        public int _proximoId;
        public List<Peca> listaPecas = new();

        public ControleDePecas()
        {
            InitializeComponent();
        }

        private void AoClicarAdicionar(object sender, EventArgs e)
        {
            CadastroDePecas cadastroDePecas = new CadastroDePecas(null);
            cadastroDePecas.ShowDialog();

            var pecaPreenchida = cadastroDePecas._peca;
            pecaPreenchida.Id = ObterProximoId();

            if (cadastroDePecas.DialogResult == DialogResult.OK)
            {
                listaPecas.Add(pecaPreenchida);
            }

            AtualizarLista();
        }

        private void AoClicarRemover(object sender, EventArgs e)
        {
            if (dataGridView2.SelectedRows.Count != 1)
            {
                MessageBox.Show("Selecione um item");
            }
            else
            {
                string mensagem = "Tem certeza que deseja remover essa linha ?";
                var resultado = MessageBox.Show(mensagem, "", MessageBoxButtons.YesNo);

                if (resultado == DialogResult.Yes)
                {

                    var linhaSelecionada = (int)dataGridView2.SelectedRows[0].Cells[0].RowIndex;
                    var pecaSelecionada = (Peca)dataGridView2.Rows[linhaSelecionada].DataBoundItem;

                    var peca = listaPecas.FirstOrDefault(x => x.Id == pecaSelecionada.Id);

                    listaPecas.Remove(peca);
                    AtualizarLista();
                }
            }
        }

        private void AtualizarLista()
        {
            dataGridView2.DataSource = null;
            dataGridView2.DataSource = listaPecas.ToList();
        }

        private void AoClicarEditar(object sender, EventArgs e)
        {
            if (dataGridView2.SelectedRows.Count != 1)
            {
                MessageBox.Show("Selecione um item");
            }
            else { 
                var linhaSelecionada = (int)dataGridView2.SelectedRows[0].Cells[0].RowIndex;
                var pecaSelecionada = (Peca)dataGridView2.Rows[linhaSelecionada].DataBoundItem;

                CadastroDePecas cadastroPeca = new CadastroDePecas(pecaSelecionada);
                cadastroPeca.ShowDialog();

                var pecaAtualizada = cadastroPeca._peca;
                pecaAtualizada.Id = pecaSelecionada.Id;
                      
                if(cadastroPeca.DialogResult == DialogResult.OK)
                {
                    listaPecas[linhaSelecionada] = pecaAtualizada;
                    AtualizarLista();
                }
            }
        }

        public int ObterProximoId()
        {
            return ++_proximoId;
        }

    }
}
