using Microsoft.AspNetCore.Identity;

namespace CapStoneBackEnd.Models.Auth
{
    public class ApplicationRole : IdentityRole
    {
        public ICollection<ApplicationUserRole> ApplicationUserRole { get; set; }
    }
}
