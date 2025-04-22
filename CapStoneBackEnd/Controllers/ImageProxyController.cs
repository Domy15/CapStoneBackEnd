using CapStoneBackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace CapStoneBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageProxyController : ControllerBase
    {
        private readonly ImageProxyService _imageProxyService;

        public ImageProxyController(ImageProxyService imageProxyService)
        {
            _imageProxyService = imageProxyService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string url)
        {
            var (imageBytes, contentType, errorMessage) = await _imageProxyService.ProxyImageAsync(url);

            if (!string.IsNullOrEmpty(errorMessage))
            {
                return BadRequest(errorMessage);
            }

            return File(imageBytes!, contentType!);
        }
    }
}
