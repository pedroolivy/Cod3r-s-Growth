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
        public void Editar(int id)
        {

        }

        public Peca ObterPorId(int id)
        {
            return ListaDePecas.First(x => x.Id == id);
        }

        public void Remover(int id)
        {
            var pegarId = ObterPorId(id);
            ListaDePecas.Remove(pegarId);
        }


    }
}

