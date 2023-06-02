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
            catch (Exception ex )
            {
                throw new Exception("Erro ao obter lista de peças", ex);
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
                    return NotFound($"Peça não encontrada com Id [{id}]");
                }

                return Ok(pecaPorId);
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao obter peça por esse Id", ex);
            }
        }

        [HttpPost]
        public IActionResult Adicionar([FromBody]Peca pecaNova)
        {
            try
            {
                if (pecaNova == null)
                {
                    return BadRequest("Preencha todos os campos");
                }

                var erros = Servico.ValidarCampos(pecaNova);

                if (!string.IsNullOrEmpty(erros))
                {
                    return BadRequest(erros);
                }

                _repositorio.Adicionar(pecaNova);

                return Ok(new { id = pecaNova.Id, peca = pecaNova });
            }
            catch (Exception ex )
            {
                throw new Exception("Erro ao adicionar uma peça", ex);
            }
        }

        [HttpPut("{id}")] 
        public IActionResult Editar(int id, [FromBody] Peca pecaEditada)
        {
            try
            {
                var pecaSelecionadaPeloId = _repositorio.ObterPorId(id);
                var erros = Servico.ValidarCampos(pecaEditada);
                
                if (!string.IsNullOrEmpty(erros))
                {
                    return BadRequest(erros);
                }

                pecaEditada.Id = pecaSelecionadaPeloId!.Id;

                _repositorio.Editar(pecaEditada);
                return Ok(pecaEditada);
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao editar a peça", ex);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            try
            {
                var pecaSelecionadaPeloId = _repositorio.ObterPorId(id);

                if (pecaSelecionadaPeloId == null)
                {
                    return NotFound($"Peça não encontrada com id [{id}]");
                }

                _repositorio.Remover(pecaSelecionadaPeloId.Id);
                return NoContent();
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao deletar a peça", ex);
            }
        }
    }
}
