using DOMINIO;
using Microsoft.AspNetCore.Mvc;

namespace WEB.Controllers
{
    [ApiController]
    [Route("pecas")]
    public class PecaController : ControllerBase
    {
        private readonly IRepositorio _repositorio;

        public PecaController(IRepositorio _repositorio)
        {
            this._repositorio = _repositorio;
        }

        [HttpGet]
        public IActionResult ObterTodos()
        {
            var x = (IActionResult)_repositorio.ObterTodos().ToList();
            return x;
        }
        [HttpGet("{id}")]
        public IActionResult ObterPorId(Guid id)
        {
            return null;
        }
        [HttpPost("{pecaNova}")]
        public IActionResult Adicionar(Guid pecaNova)
        {
            return null;
        }
        [HttpPut("{id, pecaEditada}")] 
        public IActionResult Editar(Guid id, Peca pecaEditada)

        {
            return null;
        }
        [HttpDelete("{id}")]
        public IActionResult Remove(Guid id)
        {
            return null;
        }

    }
}
