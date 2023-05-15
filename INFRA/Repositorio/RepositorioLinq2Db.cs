using System.ComponentModel;
using System.Configuration;
using DOMINIO;
using LinqToDB;
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
        public List<Peca> ObterTodos()
        {
            using var conexao = ConexaoLin2Db();
            try
            {
                List<Peca> listaDePeca = new();

                foreach (var Peca in conexao.GetTable<Peca>())
                {
                    listaDePeca.Add(Peca);
                }
                return listaDePeca;
            }
            catch (Exception ex)
            {
                throw new Exception("MensagensDeTela.ERRO_AO_ALTERAR_DADOS", ex);
            }
        }

        public Peca? ObterPorId(int id)
        {
            using var conexao = ConexaoLin2Db();
            throw new NotImplementedException();
        }

        public void Adicionar(Peca pecaNova)
        {
            using var conexao = ConexaoLin2Db();
            throw new NotImplementedException();
        }

        public void Editar(int id, Peca pecaEditada)
        {
            using var conexao = ConexaoLin2Db();
            throw new NotImplementedException();
        }

        public void Remover(int id)
        {
            using var conexao = ConexaoLin2Db();
            throw new NotImplementedException();
        }
    }
}
