using CapStoneBackEnd.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapStoneBackEnd.Models.VideoGames
{
    public class WishList
    {
        public Guid IdGame { get; set; }
        public required string IdUser { get; set; }



        [ForeignKey(nameof(IdGame))]
        public VideoGame VideoGame { get; set; }

        [ForeignKey(nameof(IdUser))]
        public ApplicationUser ApplicationUser { get; set; }
    }
}
