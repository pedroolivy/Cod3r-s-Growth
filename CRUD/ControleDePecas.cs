namespace CRUD
{
    public partial class ControleDePecas : Form
    {

        public ControleDePecas()
        {
            InitializeComponent();
        }

        private void AoClicarAdicionar(object sender, EventArgs e)
        {
            try
            {
                var listaPecas = Singleton.Instancia()._listaPecas;

                CadastroDePecas cadastroDePecas = new(null);
                cadastroDePecas.ShowDialog();

                var pecaPreenchida = cadastroDePecas._peca;
                pecaPreenchida.Id = Singleton.ObterProximoId();

                if (cadastroDePecas.DialogResult == DialogResult.OK)
                {
                    listaPecas.Add(pecaPreenchida);
                }

                AtualizarLista();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Erro inesperado", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

        }

        private void AoClicarRemover(object sender, EventArgs e)
        {
            try
            {
                if (dataGridView2.SelectedRows.Count != 1)
                {
                    MessageBox.Show("Selecione um item");
                    return;
                }

                string mensagem = "Tem certeza que deseja remover essa linha?";
                var resultado = MessageBox.Show(mensagem, "Aviso", MessageBoxButtons.YesNo, MessageBoxIcon.Question);

                var listaPecas = Singleton.Instancia()._listaPecas;
                if (resultado == DialogResult.Yes)
                {
                    var linhaSelecionada = (int)dataGridView2.SelectedRows[0].Cells[0].RowIndex;
                    var pecaSelecionada = (Peca)dataGridView2.Rows[linhaSelecionada].DataBoundItem;

                    var peca = listaPecas.First(x => x.Id == pecaSelecionada.Id);

                    listaPecas.Remove(peca);
                }

                AtualizarLista();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Erro inesperado", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void AtualizarLista()
        {
            dataGridView2.DataSource = null;
            dataGridView2.DataSource = Singleton.Instancia()._listaPecas.ToList();
        }

        private void AoClicarEditar(object sender, EventArgs e)
        {
            try
            {
                if (dataGridView2.SelectedRows.Count != 1)
                {
                    MessageBox.Show("Selecione um item");
                    return;
                }

                var linhaSelecionada = (int)dataGridView2.SelectedRows[0].Cells[0].RowIndex;
                var pecaSelecionada = (Peca)dataGridView2.Rows[linhaSelecionada].DataBoundItem;

                CadastroDePecas cadastroPeca = new CadastroDePecas(pecaSelecionada);
                cadastroPeca.ShowDialog();

                var pecaAtualizada = cadastroPeca._peca;
                pecaAtualizada.Id = pecaSelecionada.Id;

                var listaPecas = Singleton.Instancia()._listaPecas;
                if (cadastroPeca.DialogResult == DialogResult.OK)
                {
                    listaPecas[linhaSelecionada] = pecaAtualizada;
                }

                AtualizarLista();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Erro inesperado", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
