using Microsoft.Data.SqlClient;
using System.Configuration;



namespace CRUD.Repositorio
{

    public class RepositorioComBancoSql//: IRepositorio
    {
        private void RepositorioComBancoSql_laod(Object sender, EventArgs e)
        {
            //Definindo string de conexão:
            string connectionString = ConfigurationManager.ConnectionStrings["ConexaoBD"].ConnectionString;

            //Criando novo objeto SqlConnection usando a string de conexão:
            SqlConnection sqlConn = new SqlConnection(connectionString);

            //abrindo a conexão:
            sqlConn.Open();

            //Operações:










            //Fechando a conexão:
            sqlConn.Close();

        }
    }
}
