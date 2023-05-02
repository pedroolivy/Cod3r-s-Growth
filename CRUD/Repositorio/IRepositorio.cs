
namespace CRUD.Repositorio
{
    public interface IRepositorio
    {
        public List<Peca> ObterTodos();

        void Adicionar(Peca pecaNova);
        void Editar(Peca peca);
        void remover(Peca peca);

    }
}
