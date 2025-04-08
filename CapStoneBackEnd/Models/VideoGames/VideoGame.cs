using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapStoneBackEnd.Models.VideoGames
{
    public class VideoGame
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public required string Title { get; set; }

        [Required]
        public required string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateOnly ReleaseDate { get; set; }

        [Required]
        public required string Cover { get; set; }

        [Required]
        public required Guid CompanyId { get; set; }




        [ForeignKey(nameof(CompanyId))]
        public Company Company { get; set; }

        public ICollection<Library> Library { get; set; }
        public ICollection<WishList> WishList { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<GameCategory> GameCategories { get; set; }
        public ICollection<ExtraImage> ExtraImages { get; set; }
        public ICollection<Cart> Carts { get; set; }
    }
}
