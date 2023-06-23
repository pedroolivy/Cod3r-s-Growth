namespace DOMINIO
{
    public class Servico
    {
        public static string ValidarCampos(Peca peca)
        {
            const int valorMinimoPeca = 1;
            var dataMinimaValidaSql = new DateTime(1754, 07, 02, 22, 59, 59);

            if (string.IsNullOrEmpty(peca.Nome))
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

            else if (peca.Estoque < valorMinimoPeca)
            {
                return "campo Estoque sem valor!";
            }

            else if (peca.DataDeFabricacao > DateTime.Now)
            {
                return "Data maior que data atual!";
            }

            else if (peca.DataDeFabricacao < dataMinimaValidaSql )
            {
                return "Data ultrapassada!";
            }

            return string.Empty;
        }
    }
}
