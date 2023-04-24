using System.ComponentModel.DataAnnotations;

namespace CRUD
{
    public class Peca
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Escreva um nome"), StringLength(5)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Ecreva uma categoria"), StringLength(30)]
        public string Categoria { get; set; }

        [Required(ErrorMessage = "Escreva uma descrição"), StringLength(60)]
        public string Descricao { get; set; }

        [Range(1, 100, ErrorMessage = "Escreva um valor interio")]
        public int Estoque { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public DateTime DataDeFabricacao { get; set; }
    }
}
