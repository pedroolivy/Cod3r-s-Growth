using Microsoft.VisualBasic;
using System;


namespace CRUD
{
    internal class Servico
    {

        public static void ValidarCampos(Peca pecas)
        {
            if (String.IsNullOrEmpty(pecas.Nome))
            {
                MessageBox.Show("Preencha o campo corretamente");
            }
            if (String.IsNullOrEmpty(pecas.Descricao))
            {
                MessageBox.Show("Preencha o campo corretamente");
            }
            if (String.IsNullOrEmpty(pecas.Categoria))
            {
                MessageBox.Show("Preencha o campo corretamente");
            }

        }
    }
}
