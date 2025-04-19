using Microsoft.AspNetCore.Mvc;

namespace CapStoneBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            if (string.IsNullOrWhiteSpace(url))
                return BadRequest("URL mancante.");

            try
            {
                var imageBytes = await _imageProxyService.GetImageBytesAsync(url);

                var contentType = url.EndsWith(".png") ? "image/png" :
                                  url.EndsWith(".jpg") || url.EndsWith(".jpeg") ? "image/jpeg" :
                                  "application/octet-stream";

                return File(imageBytes, contentType);
            }
            catch
            {
                return BadRequest("Errore nel recupero dell'immagine.");
            }
        }
    }
}
