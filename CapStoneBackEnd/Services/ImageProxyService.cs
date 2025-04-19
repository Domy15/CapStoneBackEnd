using System.Net.Http;
using System.Threading.Tasks;

public class ImageProxyService
{
    private readonly HttpClient _httpClient;

    public ImageProxyService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<byte[]> GetImageBytesAsync(string imageUrl)
    {
        return await _httpClient.GetByteArrayAsync(imageUrl);
    }
}
