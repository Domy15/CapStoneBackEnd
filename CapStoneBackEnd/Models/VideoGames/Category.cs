using System.ComponentModel.DataAnnotations;

namespace CapStoneBackEnd.Models.VideoGames
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }

        public ICollection<GameCategory> GameCategories { get; set; }
    }
}
