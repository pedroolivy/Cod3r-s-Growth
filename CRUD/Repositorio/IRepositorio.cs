
namespace CRUD.Repositorio
{
    public interface IRepositorio 
    {
        public List<Peca> ObterTodos();

        Peca ObterPorId(int id);
        void Adicionar(Peca pecaNova);
        void Editar(Peca peca);
        void Remover(Peca peca);
    }
}
