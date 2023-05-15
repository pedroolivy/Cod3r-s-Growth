using Microsoft.Data.SqlClient;
using System.Configuration;
using DOMINIO;
using LinqToDB.Data;
using LinqToDB.DataProvider.SqlServer;

namespace INFRA.Repositorio
{
    internal class RepositorioLinq2Db : IRepositorio
    {
        public static DataConnection ConexaoLin2Db()
        {
            var DataConnection = ConfigurationManager.ConnectionStrings["ConexaoBD"].ConnectionString;
            var conexao = SqlServerTools.CreateDataConnection(DataConnection);
            return conexao;
        }

        public void Adicionar(Peca pecaNova)
        {
            throw new NotImplementedException();
        }

        public void Editar(int id, Peca pecaEditada)
        {
            throw new NotImplementedException();
        }

        public Peca? ObterPorId(int id)
        {
            throw new NotImplementedException();
        }

        public List<Peca> ObterTodos()
        {
            throw new NotImplementedException();
        }

        public void Remover(int id)
        {
            throw new NotImplementedException();
        }
    }
}
