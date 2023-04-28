namespace CRUD
{
    public class Singleton
    {
        private Singleton() { }
        private static Singleton _instancia;
        public static int _proximoId;

        public List<Peca> listaPecas { get; private set; }

        public static Singleton Instancia()
        {
            lock (typeof(Singleton))
                if (_instancia == null)
                {
                    _instancia = new Singleton
                    {
                        listaPecas = new List<Peca>()
                    };
                };
            return _instancia;

        }

        public static int ObterProximoId()
        {
            return ++_proximoId;
        }
    }
}