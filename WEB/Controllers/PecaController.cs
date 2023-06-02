using DOMINIO;
using Microsoft.AspNetCore.Mvc;

namespace WEB.Controllers
{
    [ApiController]
    [Route("api/pecas")]
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
                    return NotFound(listaDePecas);
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
                var pecaObtidaPeloId = _repositorio.ObterPorId(id);

                if (pecaObtidaPeloId == null)
                {
                    return NotFound($"Peça não encontrada com id [{id}]");
                }

                return Ok(pecaObtidaPeloId);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        [HttpPost]
        public IActionResult Adicionar([FromBody] Peca pecaNova)
        {
            try
            {
                if (pecaNova == null)
                {
                    return NoContent();
                }

                var erros = Servico.ValidarCampos(pecaNova);

                if (!string.IsNullOrEmpty(erros))
                {
                    return BadRequest(erros);
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
                var pecaObtidaPeloId = _repositorio.ObterPorId(id);

                if (pecaObtidaPeloId == null)
                {
                    return NotFound($"Peça não encontrada com id [{id}]");
                }

                pecaEditada.Id = pecaObtidaPeloId.Id;
                var erros = Servico.ValidarCampos(pecaEditada);

                if (!string.IsNullOrEmpty(erros))
                {
                    return Conflict(erros);
                }

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
                var pecaObtidaPeloId = _repositorio.ObterPorId(id);

                if (pecaObtidaPeloId == null)
                {
                    return NotFound($"Peça não encontrada com id [{id}]");
                }
    
                _repositorio.Remover(pecaObtidaPeloId.Id);

                return NoContent();
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
    }
}