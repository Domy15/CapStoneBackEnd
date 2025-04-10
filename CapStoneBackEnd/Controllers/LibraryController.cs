using CapStoneBackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace CapStoneBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly LibraryService _libraryService;

        public LibraryController(LibraryService libraryService) 
        { 
            _libraryService = libraryService;
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetLibrary(string userName)
        {
            try
            {
                var library = await _libraryService.GetLibraryAsync(userName);
                if (library == null)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { library });
            }
            catch (Exception ex) 
            { 
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [HttpPost("{userName}")]
        public async Task<IActionResult> AddGameToLibrary(string userName, [FromBody] List<Guid> gameIds)
        {
            try
            {
                var (result, count) = await _libraryService.AddGameToLibraryAsync(gameIds, userName);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                string message = count > 1 ? $"{count} giochi aggiunti alla libreria" : "1 gioco aggiunto alla libreria";

                return Ok(new { message });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }
    }
}
