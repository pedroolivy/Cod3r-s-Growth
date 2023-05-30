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
            try
            {
                var listaDePecas = _repositorio.ObterTodos().ToList();

                if (listaDePecas == null)
                {
                    return NotFound();
                }

                return Ok(listaDePecas);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            try
            {
                var pecaPorId = _repositorio.ObterPorId(id);

                if (pecaPorId == null)
                {
                    return NotFound();
                }

                return Ok(pecaPorId);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        [HttpPost("{pecaNova}")]
        public IActionResult Adicionar([FromBody]Peca pecaNova)
        {
            try
            {
                if (pecaNova == null)
                {
                    return BadRequest();
                }

                _repositorio.Adicionar(pecaNova);
                return CreatedAtAction(nameof(ObterPorId), new { id = pecaNova.Id }, pecaNova);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        [HttpPut("{id}")] 
        public IActionResult Editar(int id, [FromBody] Peca pecaEditada)
        {
            try
            {
                var idDePecaSelecionada = _repositorio.ObterPorId(id);

                if (id != idDePecaSelecionada.Id)
                {
                    return BadRequest();
                }
                pecaEditada.Id = idDePecaSelecionada.Id;

                _repositorio.Editar(pecaEditada);

                return Ok(pecaEditada);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            try
            {
                var idDePecaSelecionada = _repositorio.ObterPorId(id);
                _repositorio.Remover(idDePecaSelecionada.Id);
                return Ok(idDePecaSelecionada);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
    }
}
