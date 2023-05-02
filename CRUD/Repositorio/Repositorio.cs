using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRUD.Repositorio
{
    public class Repositorio : IRepositorio
    {
        protected List<Peca> ListaDePecas = Singleton.Instancia()._listaPecas;

        public List<Peca> ObterTodos()
        {
            return ListaDePecas;
        }

        public void Adicionar (Peca pecaNova)
        {
            ListaDePecas.Add(pecaNova);
        }
        public void Editar(Peca peca, int id)
        {
            //ListaDePecas._listaPecas./**/(peca);
        }
        public void Remover(Peca pecaNova, int id)
        {
            ListaDePecas.Remove(pecaNova);
        }

    }
}
