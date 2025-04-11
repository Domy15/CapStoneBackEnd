using CapStoneBackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace CapStoneBackEnd.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetCart(string userName)
        {
            try
            {
                var cart = await _cartService.GetCartAsync(userName);
                if (cart == null) 
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { cart });
            }
            catch (Exception ex) 
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [HttpPost("{userName}/{id}")]
        public async Task<IActionResult> AddToCart(string userName, Guid id)
        {
            try
            {
                var result = await _cartService.AddToCartAsync(id, userName);
                if(!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Gioco aggiunto al carrello!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [HttpDelete("{userName}/{id}")]
        public async Task<IActionResult> RemoveFromCart(string userName, Guid id)
        {
            try
            {
                var result = await _cartService.RemoveFromCartAsync(id, userName);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Gioco rimosso dal carrello!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [HttpDelete("{userName}")]
        public async Task<IActionResult> EmptyCart(string userName)
        {
            try
            {
                var result = await _cartService.EmptyCartAsync(userName);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Giochi rimossi dal carrello!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }
    }
}
