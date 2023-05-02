
namespace CRUD.Repositorio
{
    public interface IRepositorio 
    {
        public List<Peca> ObterTodos();

        Peca ObterPorId(int id);
        void Adicionar(Peca pecaNova);
        void Editar(int id);
        void Remover(int id);
    }
}
