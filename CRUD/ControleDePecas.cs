using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CRUD
{
    public partial class ControleDePecas : Form
    {   
        public List<Peca> listaPecas = new();
     
        public void recebeLista()
        {
            listaPecas.Add(new Peca("Parafuso", "Ferramenta", "Usada", 5));
            listaPecas.Add(new Peca("teste", "Ferramenta", "Seminova", 2));
            listaPecas.Add(new Peca("Prego", "Ferramenta", "Gold", 15));
            listaPecas.Add(new Peca("teste", "Ferramenta", "Usada", 25));                    
        }

        public ControleDePecas()
        {
            InitializeComponent();
            recebeLista();
            ControleDePecas_Load();
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
