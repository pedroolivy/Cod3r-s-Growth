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
            var peca = _repositorio.ObterTodos();

            if (peca == null)
            {
                return NotFound();
            }

            return Ok(peca);
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var peca = _repositorio.ObterPorId(id);

            if (peca == null)
            {
                return NotFound();
            }

            return Ok(peca);
        }

        [HttpPost("{pecaNova}")]
        public IActionResult Adicionar(Peca pecaNova)
        {
            var peca = _repositorio;
            peca.Adicionar(pecaNova);
            pecaNova.Id = Singleton.ObterProximoId();
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
