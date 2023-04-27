namespace CRUD
{
    public class Servico
    {
        public static string ValidarCampos(Peca peca)
        {
            if(string.IsNullOrEmpty(peca.Nome))
            {
                return "campo Nome vazio!";
            }
            else if (string.IsNullOrEmpty(peca.Categoria))
            {
                return "campo Categoria vazio!";
            }

            else if (string.IsNullOrEmpty(peca.Descricao))
            {
                return "campo Descrição vazio!";
            }

            else if (peca.Estoque < 1)
            {
                return "campo Estoque sem valor!";
            }

            return string.Empty;
        }
    }
}
