namespace CRUD
{
    public class Singleton
    {
        private static Singleton? _instancia;
        public static int _proximoId;

        public List<Peca>? _listaPecas;

        public static Singleton Instancia()
        {
            lock (typeof(Singleton))
                if (_instancia == null)
                {
                    _instancia = new Singleton
                    {
                        _listaPecas = new List<Peca>()
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