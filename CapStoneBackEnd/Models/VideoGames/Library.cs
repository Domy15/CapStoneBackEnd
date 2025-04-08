using System.ComponentModel.DataAnnotations.Schema;
using CapStoneBackEnd.Models.Auth;

namespace CapStoneBackEnd.Models.VideoGames
{
    public class Library
    {
        public Guid IdGame { get; set; }
        public required string IdUser { get; set; }



        [ForeignKey(nameof(IdGame))]
        public VideoGame VideoGame { get; set; }

        [ForeignKey(nameof(IdUser))]
        public ApplicationUser ApplicationUser { get; set; }
    }
}
