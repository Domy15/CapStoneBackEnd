using CapStoneBackEnd.Models.Auth;
using CapStoneBackEnd.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using CapStoneBackEnd.DTOs.Account;
using CapStoneBackEnd.Services;
using Microsoft.AspNetCore.Authorization;

namespace CapStoneBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly Jwt _jwtSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly AccountService _accountService;

        public AccountController(IOptions<Jwt> jwtSettings, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager, AccountService accountService)
        {
            _jwtSettings = jwtSettings.Value;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequest)
        {

            if (registerRequest == null)
            {
                return BadRequest(new
                {
                    message = "Ops qualcosa e' andato storto"
                });
            }

            var existingUser = await _userManager.FindByNameAsync(registerRequest.UserName);
            if (existingUser != null)
            {
                return BadRequest(new
                {
                    message = "Il nome utente è già in uso"
                });
            }

            var newUser = new ApplicationUser()
            {
                Email = registerRequest.Email,
                FirstName = registerRequest.FirstName,
                LastName = registerRequest.LastName,
                UserName = registerRequest.UserName,
                BirthDate = registerRequest.BirthDate
            };
            var result = await _userManager.CreateAsync(newUser, registerRequest.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "Ops qualcosa e' andato storto"
                });
            }
            var user = await _userManager.FindByEmailAsync(newUser.Email);
            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Ops qualcosa e' andato storto"
                });
            }

            await _userManager.AddToRoleAsync(user, "User");

            return Ok(new
            {
                message = "Utente Registrato Correttamente"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.UserName);
            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Credenziali errate"
                });
            }
            var signInResult = await _signInManager.PasswordSignInAsync(user, loginRequest.Password, true, false);
            if (!signInResult.Succeeded)
            {
                return BadRequest(new { message = "Credenziali errate" });
            }
            var roles = await _signInManager.UserManager.GetRolesAsync(user);
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            claims.Add(new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"));
            claims.Add(new Claim("email", user.Email));
            claims.Add(new Claim("name", $"{user.FirstName} {user.LastName}"));
            claims.Add(new Claim("username", user.UserName));

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
                claims.Add(new Claim("role", role));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecurityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiry = DateTime.Now.AddMinutes(_jwtSettings.ExpiresInMinutes);

            var token = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claims, expires: expiry, signingCredentials: creds);
            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new TokenResponseDto()
            {
                Token = tokenString,
            });
        }

        [Authorize]
        [HttpPost("updatePfP/{userName}")]
        public async Task<IActionResult> UpdateProfileImage(string userName, [FromForm] UpdateImageProfileDto imageFile)
        {
            try
            {
                var result = await _accountService.UpdateProfileImageAsync(userName, imageFile);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto" });
                }

                return Ok(new { message = "Immagine aggiornata con successo" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPut("UpdateProfile/{UserName}")]
        public async Task<IActionResult> UpdateProfile(string UserName, [FromBody] UpdateUserRequestDto userUpdate)
        {
            try
            {
                var (result, message) = await _accountService.UpdateProfileAsync(UserName, userUpdate);
                if (!result)
                {
                    return BadRequest(new { message });
                }

                return Ok(new { message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
