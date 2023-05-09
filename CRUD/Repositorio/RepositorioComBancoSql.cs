using Microsoft.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;

namespace CRUD.Repositorio
{
    public class RepositorioComBancoSql : IRepositorio
    {
        private static string connectionString = ConfigurationManager.ConnectionStrings["ConexaoBD"].ConnectionString;

        Peca peca = new(); 

        public List<Peca> ObterTodos()
        {
            SqlConnection conexaoBanco = new SqlConnection(connectionString);

            conexaoBanco.Open();

            SqlCommand comandoDeExecucao = new SqlCommand("SELECT * FROM Peca", conexaoBanco);

            var ler = comandoDeExecucao.ExecuteReader();

            List<Peca> lista = new(); 

            while (ler.Read())
            {
                peca = new Peca()
                {
                    Id = Convert.ToInt32(ler[0]),
                    Categoria = ler[1].ToString(),
                    Nome = ler[2].ToString(),
                    Descricao = ler[3].ToString(),
                    Estoque = int.Parse(ler[4].ToString()),
                    DataDeFabricacao = Convert.ToDateTime(ler[5])
                };

                lista.Add(peca);
            }

            conexaoBanco.Close();
            
            return lista;
        }   

        public Peca ObterPorId(int id) 
        {
            SqlConnection conexaoBanco = new SqlConnection(connectionString);

            conexaoBanco.Open();

            SqlCommand comandoDeExecucao = new SqlCommand($"SELECT * FROM Peca WHERE Id = {id}", conexaoBanco);

            var ler = comandoDeExecucao.ExecuteReader();

            while (ler.Read())
            {
                peca = new Peca()
                {
                    Id = Convert.ToInt32(ler[0]),
                    Categoria = ler[1].ToString(),
                    Nome = ler[2].ToString(),
                    Descricao = ler[3].ToString(),
                    Estoque = int.Parse(ler[4].ToString()),
                    DataDeFabricacao = Convert.ToDateTime(ler[5])
                };               
            }

            conexaoBanco.Close();

            return peca;
        }

        public void Remover(int id) 
        {
            SqlConnection conexaoBanco = new SqlConnection(connectionString);
           
            conexaoBanco.Open();

            var pecaARemover = ObterPorId(id);

            var comando = new SqlCommand($"DELETE FROM Peca where Id = {id}", conexaoBanco);

            if (pecaARemover != null)
            {              
                comando.ExecuteNonQuery();
            }
            
            conexaoBanco.Close();
        }
                  
        public void Adicionar(Peca pecaNova) 
        {
            SqlConnection conexaoBanco = new SqlConnection(connectionString);

            conexaoBanco.Open();

            var comando = new SqlCommand("INSERT INTO Peca" +
                "(Categoria, Nome, Descricao, Estoque, DataDeFabricacao) " +
                "VALUES " +
                $"('{pecaNova.Categoria}', '{pecaNova.Nome}', '{pecaNova.Descricao}', {pecaNova.Estoque}, '{pecaNova.DataDeFabricacao}');"  
                , conexaoBanco);

            comando.ExecuteNonQuery();

            conexaoBanco.Close();
        }

        public void Editar(int id, Peca pecaEditada) 
        {
            SqlConnection conexaoBanco = new SqlConnection(connectionString);

            conexaoBanco.Open();

            List<Peca> lista = new();

            var index = lista.FindIndex(x => x.Id == id);
            lista[index] = pecaEditada;

            conexaoBanco.Close();
        }
    }
}
