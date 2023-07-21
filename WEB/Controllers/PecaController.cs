using DOMINIO;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace WEB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
                var lista = _repositorio.ObterTodos().ToList();

                return lista == null
                    ? NotFound()
                    : Ok(lista);
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
                //throw new Exception("asdf");

                var peca = _repositorio.ObterPorId(id);

                return peca == null
                    ? NotFound($"Peça não encontrada com id [{id}]")
                    : Ok(peca);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.InnerException.Message);
            }
        }

        [HttpPost]
        public IActionResult Adicionar([FromBody][Required] Peca pecaNova)
        {
            try
            {
                var erros = Servico.ValidarCampos(pecaNova);

                if (erros.Any())
                {
                    return BadRequest(erros);
                }

                _repositorio.Adicionar(pecaNova);
                return Ok(new { id = pecaNova.Id, peca = pecaNova });
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

                if (erros.Any())
                {
                    throw new ValidationException(erros);
                }

                _repositorio.Editar(id, pecaEditada);
                return Ok(pecaEditada);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.InnerException.Message);
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
            catch (Exception ex)
            {
                throw new Exception(ex.InnerException.Message);
            }
        }
    }
}