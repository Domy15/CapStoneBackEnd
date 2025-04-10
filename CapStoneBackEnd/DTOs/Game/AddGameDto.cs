using System.ComponentModel.DataAnnotations;

namespace CapStoneBackEnd.DTOs.Game
{
    public class AddGameDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required decimal Price { get; set; }
        public required DateOnly ReleaseDate { get; set; }
        public required IFormFile Cover { get; set; }
        public required Guid CompanyId { get; set; }
        public List<int> CategoriesId { get; set; }
    }
}
