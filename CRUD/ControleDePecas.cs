using Microsoft.VisualBasic.ApplicationServices;
using System.Collections.Generic;
using System.Windows.Forms;

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

            var linhaSelecionada = (int)dataGridView2.SelectedRows[0].Cells[0].RowIndex;
            var pecaSelecionada = (Peca)dataGridView2.Rows[linhaSelecionada].DataBoundItem;

            var retiraPecas = listaPecas;

            retiraPecas.Remove(pecaSelecionada);
            AtualizarLista();
        }

        private void AtualizarLista()
        {
            dataGridView2.DataSource = null;
            dataGridView2.DataSource = listaPecas;
        }

        private void AoClicarEditar(object sender, EventArgs e)
        {
            var linhaSelecionada = (int)dataGridView2.SelectedRows[0].Cells[0].RowIndex;
            var pecaSelecionada = (Peca)dataGridView2.Rows[linhaSelecionada].DataBoundItem;

            CadastroDePecas cadastroPeca = new CadastroDePecas(pecaSelecionada);
            cadastroPeca.ShowDialog();

            var pecaAtualizada = cadastroPeca._peca;
            pecaAtualizada.Id = pecaSelecionada.Id;

            listaPecas[linhaSelecionada] = pecaAtualizada;
        
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
