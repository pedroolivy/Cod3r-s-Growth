using Microsoft.VisualBasic;
using System;
using System.Windows.Forms;
using System.Text.RegularExpressions;


namespace CRUD
{
    public class Servico
    {
        public string? ValidarCampos(Peca peca)
        {
            if(string.IsNullOrEmpty(peca.Nome))
            {
                return "campo Nome vazio!";
            }

            /*else if (Regex.IsMatch(peca.Estoque, "[^0-9]") || string.IsNullOrEmpty(peca.Estoque))
            {
                MessageBox.Show("Preencha o campo Descrição e insira somente números.");
                peca.Estoque = peca.Estoque.Remove(peca.Estoque.Length - 1);
                return;
            }*/

            else if (string.IsNullOrEmpty(peca.Categoria))
            {
                return "campo Categoria vazio!";
            }

            else if (string.IsNullOrEmpty(peca.Descricao))
            {
                return "campo Descrição vazio!";
            }

            peca.DataDeFabricacao = DateTime.Today;

            return null;
        }
    }
}
