using Microsoft.VisualBasic;
using System;
using System.Windows.Forms;
using System.Text.RegularExpressions;


namespace CRUD
{
    internal class Servico
    {
        
        public Peca _peca = new(); 

        public static void ValidarCampos(Peca pecas)
        {
            if (pecas.Nome == string.Empty)
            {
                MessageBox.Show("campo Nome vazio!", "Informação", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            /*else if (Regex.IsMatch(pecas.Estoque, "[^0-9]") || string.IsNullOrEmpty(pecas.Estoque))
            {
                MessageBox.Show("Preencha o campo Descrição e insira somente números.");
                pecas.Estoque = tpecas.Estoque.Remove(pecas.Estoque.Length - 1);
                return;
            }*/

            else if (pecas.Categoria == string.Empty)
            {
                MessageBox.Show("campo Categoria vazio!", "Informação", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            else if (pecas.Descricao == string.Empty)
            {
                MessageBox.Show("campo Descrição vazio!", "Informação", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            pecas.DataDeFabricacao = DateTime.Today;
           

        }
    }
}
