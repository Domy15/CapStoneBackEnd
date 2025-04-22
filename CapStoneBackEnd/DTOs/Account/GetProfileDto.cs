using System.ComponentModel.DataAnnotations;

namespace CapStoneBackEnd.DTOs.Account
{
    public class GetProfileDto
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public string? ImageProfile { get; set; } = null;
        public required string Phone { get; set; }
        public required DateOnly BirthDate { get; set; }
    }
}
