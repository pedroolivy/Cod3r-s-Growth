using DOMINIO;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace WEB.Controllers
{
    [ApiController]
    [Route("api/v1/peca")]
    public class PecaController : ControllerBase
    {
        private readonly IRepositorio _repositorio;

        public PecaController(IRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public IActionResult ObterTodos()
        {
            var listaDePecas = _repositorio.ObterTodos().ToList();

            if (listaDePecas == null)
            {
                return NotFound();
            }

            return Ok(listaDePecas);
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
            _repositorio.Adicionar(pecaNova);

            if (pecaNova == null)
            {
                return BadRequest();
            }

            return Created($"Peca/{pecaNova}", pecaNova);
        }

        [HttpPut("{id, pecaEditada}")] 
        public IActionResult Editar(int id, [FromBody] Peca pecaEditada)
        {
            _repositorio.Editar(id, pecaEditada);

            if (pecaNova == null)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(Guid id)
        {
            return null;
        }

    }
}
