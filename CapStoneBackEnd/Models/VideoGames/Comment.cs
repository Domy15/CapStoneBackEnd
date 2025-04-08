using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CapStoneBackEnd.Models.Auth;

namespace CapStoneBackEnd.Models.VideoGames
{
    public class Comment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public required string Content { get; set; }

        [Required]
        public string IdUser { get; set; }

        [Required]
        public Guid IdGame { get; set; }



        [ForeignKey(nameof(IdGame))]
        public VideoGame VideoGame { get; set; }

        [ForeignKey(nameof(IdUser))]
        public ApplicationUser ApplicationUser { get; set; }
    }
}
