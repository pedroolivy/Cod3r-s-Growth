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
            CadastroDePecas cadastroDePecas = new(null);
            cadastroDePecas.ShowDialog();

            var pecaPreenchida = cadastroDePecas._peca;
            pecaPreenchida.Id = Singleton.ObterProximoId();

            if (cadastroDePecas.DialogResult == DialogResult.OK)
            {
                Singleton.Instancia().listaPecas.Add(pecaPreenchida);
            }

            AtualizarLista();
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

                if (resultado == DialogResult.Yes)
                {

                    var linhaSelecionada = (int)dataGridView2.SelectedRows[0].Cells[0].RowIndex;
                    var pecaSelecionada = (Peca)dataGridView2.Rows[linhaSelecionada].DataBoundItem;

                    var peca = Singleton.Instancia().listaPecas.First(x => x.Id == pecaSelecionada.Id);

                    Singleton.Instancia().listaPecas.Remove(peca);
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
            dataGridView2.DataSource = Singleton.Instancia().listaPecas.ToList();
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

                if (cadastroPeca.DialogResult == DialogResult.OK)
                {
                    Singleton.Instancia().listaPecas[linhaSelecionada] = pecaAtualizada;
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
