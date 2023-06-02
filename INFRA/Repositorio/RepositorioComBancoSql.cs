using Microsoft.Data.SqlClient;
using System.Configuration;
using DOMINIO;

namespace INFRA.Repositorio
{
    public class RepositorioComBancoSql : IRepositorio
    {
        private static readonly string _connectionString = ConfigurationManager.ConnectionStrings["ConexaoBD"].ConnectionString;

        public List<Peca> ObterTodos()
        {
            SqlConnection conexaoBanco = new(_connectionString);

            conexaoBanco.Open();

            SqlCommand comandoDeExecucao = new("SELECT * FROM Peca", conexaoBanco);

            var lerExecucaoQuery = comandoDeExecucao.ExecuteReader();

            List<Peca> lista = new();

            Peca peca;

            while (lerExecucaoQuery.Read())
            {
                peca = new Peca()
                {
                    Id = Convert.ToInt32(lerExecucaoQuery[0]),
                    Categoria = lerExecucaoQuery[1].ToString(),
                    Nome = lerExecucaoQuery[2].ToString(),
                    Descricao = lerExecucaoQuery[3].ToString(),
                    Estoque = Convert.ToInt32(lerExecucaoQuery[4]),
                    DataDeFabricacao = Convert.ToDateTime(lerExecucaoQuery[5])
                };

                lista.Add(peca);
            }

            conexaoBanco.Close();

            return lista;
        }

        public Peca ObterPorId(int id)
        {
            Peca peca = new();

            SqlConnection conexaoBanco = new(_connectionString);

            conexaoBanco.Open();

            SqlCommand comandoDeExecucao = new($"SELECT * FROM Peca WHERE Id = {id}", conexaoBanco);

            var lerExecucaoQuery = comandoDeExecucao.ExecuteReader();

            while (lerExecucaoQuery.Read())
            {
                peca.Id = Convert.ToInt32(lerExecucaoQuery[0]);
                peca.Categoria = lerExecucaoQuery[1].ToString();
                peca.Nome = lerExecucaoQuery[2].ToString();
                peca.Descricao = lerExecucaoQuery[3].ToString();
                peca.Estoque = Convert.ToInt32(lerExecucaoQuery[4]);
                peca.DataDeFabricacao = Convert.ToDateTime(lerExecucaoQuery[5]);
            };

            conexaoBanco.Close();

            return peca.Id == 0
                    ? null
                    : peca;
        }

        public void Adicionar(Peca pecaNova)
        {
            SqlConnection conexaoBanco = new(_connectionString);

            conexaoBanco.Open();
            var comando = new SqlCommand("INSERT INTO Peca (Categoria, Nome, Descricao, Estoque, DataDeFabricacao) VALUES " + $"('{pecaNova.Categoria}', '{pecaNova.Nome}', '{pecaNova.Descricao}', {pecaNova.Estoque}, '{pecaNova.DataDeFabricacao}');", conexaoBanco);
            comando.ExecuteNonQuery();

            pecaNova.Id = ObterUltimoIdCriado(conexaoBanco);

            conexaoBanco.Close();
        }

        private static int ObterUltimoIdCriado(SqlConnection connection)
        {
            string query = "SELECT CONVERT(int, SCOPE_IDENTITY())";
            using (SqlCommand cmd = new(query, connection))
            {
                return (int)cmd.ExecuteScalar();
            }
        }

        public void Editar(int id, Peca pecaEditada)
        {
            SqlConnection conexaoBanco = new(_connectionString);

            conexaoBanco.Open();

            var comando = new SqlCommand($"UPDATE Peca SET Categoria = '{pecaEditada.Categoria}', Nome = '{pecaEditada.Nome}', Descricao = '{pecaEditada.Descricao}', Estoque = {pecaEditada.Estoque}, DataDeFabricacao = '{pecaEditada.DataDeFabricacao}' WHERE Id ={pecaEditada.Id} ", conexaoBanco);

            comando.ExecuteNonQuery();

            conexaoBanco.Close();
        }

        public void Remover(int id)
        {
            SqlConnection conexaoBanco = new(_connectionString);

            conexaoBanco.Open();

            var pecaARemover = ObterPorId(id);

            var comando = new SqlCommand($"DELETE FROM Peca where Id = {id}", conexaoBanco);

            if (pecaARemover != null)
            {
                comando.ExecuteNonQuery();
            }

            conexaoBanco.Close();
        }
    }
}
