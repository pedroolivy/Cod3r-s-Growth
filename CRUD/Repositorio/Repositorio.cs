
namespace CRUD.Repositorio
{
    public class Repositorio : IRepositorio
    {

        protected List<Peca> ListaDePecas = Singleton.Instancia()._listaPecas;

        public List<Peca> ObterTodos()
        {
            return ListaDePecas;
        }

        public Peca ObterPorId(int id)
        {
            return ListaDePecas.First(x => x.Id == id);
        }

        public void Remover(int id)
        {
            var pecaARemover = ObterPorId(id);
            ListaDePecas.Remove(pecaARemover);
        }

        public void Adicionar (Peca pecaNova)
        {
            ListaDePecas.Add(pecaNova);
        }

        public void Editar(int id)
        {
            var pecaAEditar = ObterPorId(id);       
            var indice = ListaDePecas.IndexOf(pecaAEditar);
            ListaDePecas[indice] = pecaAEditar;
        }
    }
}
