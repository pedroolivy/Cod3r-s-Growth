
using System.Collections.Generic;
using System.ComponentModel;

namespace CRUD
{
    public class Singleton
    {
        private Singleton() { }

        private static Singleton _instancia;
        public List<Peca> listaPecas { get; private set; }

        public static Singleton Instancia()
        {
            lock (typeof(Singleton))
                if (_instancia == null)
                {
                    _instancia = new Singleton
                    {
                        listaDePecas = new List<Peca>()
                    };
                };
            return _instancia;
        }
    }
}