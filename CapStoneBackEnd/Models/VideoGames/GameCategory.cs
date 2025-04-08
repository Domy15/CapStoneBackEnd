using System.ComponentModel.DataAnnotations.Schema;

namespace CapStoneBackEnd.Models.VideoGames
{
    public class GameCategory
    {
        public int CategoryId { get; set; }

        public Guid GameId { get; set; }



        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; }

        [ForeignKey(nameof(GameId))]
        public VideoGame VideoGame { get; set; }
    }
}
