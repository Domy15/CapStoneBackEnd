using CapStoneBackEnd.DTOs.Game;
using CapStoneBackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace CapStoneBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly GameService _gameService;

        public GameController(GameService gameService) 
        {
            _gameService = gameService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGames()
        {
            try
            {
                var games = await _gameService.GetAllGamesAsync();
                if (games == null) 
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { games.Games });
            }
            catch (Exception ex)
            { 
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Rirpova più tardi!" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGame(Guid id)
        {
            try
            {
                var game = await _gameService.GetGameAsync(id);
                if (game == null)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { game });
            }
            catch (Exception ex) 
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Rirpova più tardi!" });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddGame([FromForm] AddGameDto addGameDto)
        {
            try
            {
                var result = await _gameService.AddGameAsync(addGameDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Gioco aggiunto con successo!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Rirpova più tardi!" });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGame(Guid id, [FromForm] UpdateGameDto updateGameDto)
        {
            try
            {
                var result = await _gameService.UpdateGameAsync(id, updateGameDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Gioco aggiornato con successo!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Rirpova più tardi!" });
            } 
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(Guid id)
        {
            try
            {
                var result = await _gameService.DeleteGameAsync(id);
                if(!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Gioco eliminato con successo!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Rirpova più tardi!" });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("extraImages/{id}")]
        public async Task<IActionResult> AddExtraImage(Guid id,[FromForm] AddExtraImageDto addExtraImageDto)
        {
            try
            {
                if(addExtraImageDto.ExtraImages.Count == 0)
                {
                    return BadRequest(new { message = "Nessuna immagine selezionata!" });
                }

                var result = await _gameService.AddExtraImageAsync(id, addExtraImageDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                int number = addExtraImageDto.ExtraImages.Count;
                string message = number == 1 ? "Immagine aggiunta" : $"{number} Immagini aggiunte";

                return Ok(new { message });

            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Rirpova più tardi!" });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("extraImages/{id}")]
        public async Task<IActionResult> DeleteExtraImage(Guid id)
        {
            try
            {
                var result = await _gameService.DeleteExtraImageAsync(id);
                if(!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { messagge = "Immagne eliminata con successo!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }
    }
}
