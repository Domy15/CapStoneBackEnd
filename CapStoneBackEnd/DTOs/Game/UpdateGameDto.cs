namespace CapStoneBackEnd.DTOs.Game
{
    public class UpdateGameDto
    {
        public required string Description { get; set; }
        public required decimal Price { get; set; }
        public IFormFile? Cover { get; set; } = null;
        public IFormFile? CoverLarge { get; set; } = null;
    }
}
