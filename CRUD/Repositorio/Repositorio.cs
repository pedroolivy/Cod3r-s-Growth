using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRUD.Repositorio
{
    public class Repositorio : IRepositorio
    {

        public List<Peca> ObterTodos()
        {
            return Singleton.Instancia()._listaPecas;
        }

        public void Adicionar (Peca pecaNova)
        {
            Singleton.Instancia()._listaPecas.Add(pecaNova);
        }
        public void Editar(Peca pecaNova)
        {
            //Singleton.Instancia()._listaPecas.Add(pecaNova);
        }
        public void remover(Peca pecaNova)
        {
            //Singleton.Instancia()._listaPecas.Add(pecaNova);
        }

    }
}
