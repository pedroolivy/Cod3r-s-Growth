using DOMINIO;
using Microsoft.AspNetCore.Mvc;

namespace WEB.Controllers
{
    [ApiController]
    [Route("pecas")]
    public class PecaController : ControllerBase
    {
        [HttpGet]
        public IActionResult ObterTodos()
        {
            return null;
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
