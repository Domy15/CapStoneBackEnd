using System.ComponentModel.DataAnnotations;

namespace CapStoneBackEnd.Models.VideoGames
{
    public class Company
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public required string Name { get; set; }


        public ICollection<VideoGame> VideoGames { get; set; }
    }
}
