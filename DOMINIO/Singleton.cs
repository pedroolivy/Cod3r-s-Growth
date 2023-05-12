namespace DOMINIO
{
    public class Singleton
    {
        private static Singleton? _instancia;
        public static int _proximoId;

        public List<Peca>? _listaPecas;

        public static Singleton Instancia()
        {
            lock (typeof(Singleton))
                _instancia ??= 
                    new Singleton();
            
            return _instancia;
        }

        public static int ObterProximoId()
        {
            return ++_proximoId;
        }
    }
}
