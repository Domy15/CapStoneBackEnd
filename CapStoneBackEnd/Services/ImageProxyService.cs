using Serilog;

namespace CapStoneBackEnd.Services
{
    public class ImageProxyService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ImageProxyService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<(byte[]? ImageBytes, string? ContentType, string? ErrorMessage)> ProxyImageAsync(string url)
        {
            if (string.IsNullOrWhiteSpace(url) || !Uri.IsWellFormedUriString(url, UriKind.Absolute))
            {
                return (null, null, "URL non valido.");
            }

            try
            {
                var client = _httpClientFactory.CreateClient();
                var response = await client.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    return (null, null, "Immagine non trovata o accesso negato.");
                }

                var contentType = response.Content.Headers.ContentType?.MediaType ?? "image/jpeg";
                var imageBytes = await response.Content.ReadAsByteArrayAsync();

                return (imageBytes, contentType, null);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante il proxy dell'immagine.");
                return (null, null, "Errore durante il proxy dell'immagine.");
            }
        }
    }
}
