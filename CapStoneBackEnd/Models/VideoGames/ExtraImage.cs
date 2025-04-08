using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapStoneBackEnd.Models.VideoGames
{
    public class ExtraImage
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid GameId { get; set; }
        [Required]
        public required string Image { get; set; }


        [ForeignKey(nameof(GameId))]
        public VideoGame VideoGame { get; set; }
    }
}
