using System.ComponentModel.DataAnnotations.Schema;
using CapStoneBackEnd.Models.Auth;

namespace CapStoneBackEnd.Models.VideoGames
{
    public class Cart
    {
        public Guid GameId { get; set; }
        public required string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public ApplicationUser ApplicationUser { get; set; }

        [ForeignKey(nameof(GameId))]
        public VideoGame VideoGame { get; set; }
    }
}
