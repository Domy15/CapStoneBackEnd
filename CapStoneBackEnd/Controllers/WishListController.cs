using CapStoneBackEnd.Models.VideoGames;
using CapStoneBackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace CapStoneBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        private readonly WishListService _wishListService;

        public WishListController(WishListService wishListService)
        {
            _wishListService = wishListService;
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetWishList(string userName)
        {
            try
            {
                var wishList = await _wishListService.GetWishListAsync(userName);
                if (wishList == null) 
                { 
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { wishList });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [HttpPost("{userName}/{id}")]
        public async Task<IActionResult> AddToWishList(string userName, Guid id)
        {
            try
            {
                var result = await _wishListService.AddGameToWishListAsync(id, userName);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Gioco aggiunto alla Lista desideri!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [HttpDelete("{userName}/{id}")]
        public async Task<IActionResult> RemoveFromWishList(string userName, Guid id)
        {
            try
            {
                var result = await _wishListService.RemoveFromWishListAsync(id, userName);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Gioco rimosso dalla Lista desideri!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }
    }
}
