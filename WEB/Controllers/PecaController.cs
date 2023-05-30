using DOMINIO;
using Microsoft.AspNetCore.Mvc;

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
            var pecaPorId = _repositorio.ObterPorId(id);

            if (pecaPorId == null)
            {
                return NotFound();
            }

            return Ok(pecaPorId);
        }

        [HttpPost("{pecaNova}")]
        public IActionResult Adicionar([FromBody]Peca pecaNova)
        {

            if (pecaNova == null)
            {
                return BadRequest();
            }

            _repositorio.Adicionar(pecaNova);
            return CreatedAtAction(nameof(ObterPorId), new {id = pecaNova.Id }, pecaNova);
        }

        [HttpPut("{id}")] 
        public IActionResult Editar(int id, [FromBody] Peca PecaSelecionada)
        {

            var idDePecaSelecionada = _repositorio.ObterPorId(id);

            if (id != idDePecaSelecionada.Id)
            {
                return BadRequest();
            }

            _repositorio.Editar(PecaSelecionada);
            return Ok(PecaSelecionada);
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(Guid id)
        {
            return null;
        }

    }
}
