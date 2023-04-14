namespace CRUD
{
    public class Peca
    {
        public Peca(int id, string nome, string categoria, string descricao, int estoque) 
        {
            Id = id;
            Nome = nome;
            Categoria = categoria;
            Descricao = descricao;
            Estoque = estoque;
            DataDeFabricacao = DateTime.Now;
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Categoria { get; set; } 
        public string Descricao { get; set; }
        public int Estoque { get; set; }
        public DateTime DataDeFabricacao { get; set; }
    }
}
