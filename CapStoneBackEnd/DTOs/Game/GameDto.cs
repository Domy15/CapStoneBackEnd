using System.ComponentModel.DataAnnotations;

namespace CapStoneBackEnd.DTOs.Game
{
    public class GameDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public DateOnly ReleaseDate { get; set; }
        public required string Cover { get; set; }
        public required string CoverLarge { get; set; }
        public required string Company { get; set; }
        public List<CategoryDto> Categories { get; set; }
        public List<ExtraImageDto> ExtraImages { get; set; }
    }
}
