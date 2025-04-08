using System.ComponentModel.DataAnnotations;
using CapStoneBackEnd.Models.VideoGames;
using Microsoft.AspNetCore.Identity;

namespace CapStoneBackEnd.Models.Auth
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public required string FirstName { get; set; }
        [Required]
        public required string LastName { get; set; }
        public string? ImageProfile { get; set; } = null;
        [Required]
        [DataType(DataType.Date)]
        public required DateOnly BirthDate { get; set; }


        public ICollection<ApplicationUserRole> ApplicationUserRole { get; set; }
        public ICollection<Library> Library { get; set; }
        public ICollection<WishList> WishList { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Cart> Carts { get; set; }
    }
}
