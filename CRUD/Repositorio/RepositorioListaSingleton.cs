
namespace CRUD.Repositorio
{
    public class RepositorioListaSingleton : IRepositorio
    {
        protected List<Peca> ListaDePecas = Singleton.Instancia()._listaPecas;

        public List<Peca> ObterTodos()
        {
            return ListaDePecas.ToList();
        }

        public Peca? ObterPorId(int id)
        {
            return ListaDePecas.FirstOrDefault(x => x.Id == id);
        }

        public void Remover(int id)
        {
            var pecaARemover = ObterPorId(id);

            if (pecaARemover != null)
            {
                ListaDePecas.Remove(pecaARemover);
            }
        }

        public void Adicionar(Peca pecaNova)
        {
            ListaDePecas.Add(pecaNova);
        }

        public void Editar(int id, Peca pecaEditada)
        {
            var index = ListaDePecas.FindIndex(x => x.Id == id);
            ListaDePecas[index] = pecaEditada;
        }
    }
}
