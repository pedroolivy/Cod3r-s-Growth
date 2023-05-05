using Microsoft.Data.SqlClient;
using System.Configuration;



namespace CRUD.Repositorio
{

    public class RepositorioComBancoSql//: IRepositorio
    {
        private void RepositorioComBancoSql_laod(Object sender, EventArgs e)
        {
            //Definindo string de conexão:
            var connectionString = ConfigurationManager.ConnectionStrings["ConexaoBD"].ConnectionString;

            //Criando novo objeto SqlConnection usando a string de conexão:
            SqlConnection conexaoSql = new SqlConnection(connectionString);

            //abrindo a conexão:
            conexaoSql.Open();

            //Operações:










            //Fechando a conexão:
            conexaoSql.Close();

        }
    }
}
