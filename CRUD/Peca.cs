using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRUD
{
    public class Peca
    {
        public Peca(string nome, string categoria, string descricao, int estoque) 
        {
            Nome= nome;
            Categoria= categoria;
            Descricao= descricao;
            Estoque = estoque;
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public String Categoria { get; set; } 
        public string Descricao { get; set; }
        public int Estoque { get; set; }
        public DateTime DataDeFabricacao { get; set; }
    }
}
