using Azure.Identity;
using CapStoneBackEnd.Data;
using CapStoneBackEnd.DTOs.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBackEnd.Services
{
    public class AccountService
    {
        private readonly ApplicationDbContext _context;

        public AccountService(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<bool> SaveAsync()
        {
            try
            {
                return await _context.SaveChangesAsync() > 0;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateProfileImageAsync(string userName, UpdateImageProfileDto imageFile)
        {
            try
            {
                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (user == null)
                {
                    return false;
                }

                if (imageFile.ImageFile != null && imageFile.ImageFile.Length > 0)
                {
                    if (!string.IsNullOrEmpty(user.ImageProfile))
                    {
                        var relativePath = user.ImageProfile.Replace("/", Path.DirectorySeparatorChar.ToString())
                                                            .Replace("\\", Path.DirectorySeparatorChar.ToString());
                        var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), relativePath);
                        if (File.Exists(oldImagePath))
                        {
                            File.Delete(oldImagePath);
                        }
                    }

                    var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "assets", "images");
                    if (!Directory.Exists(uploadDirectory))
                    {
                        Directory.CreateDirectory(uploadDirectory);
                    }

                    var fileExtension = Path.GetExtension(imageFile.ImageFile.FileName);
                    var fileName = Guid.NewGuid().ToString() + fileExtension;

                    var filePath = Path.Combine(uploadDirectory, fileName);

                    await using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.ImageFile.CopyToAsync(stream);
                    }

                    user.ImageProfile = Path.Combine("assets", "images", fileName).Replace("\\", "/");
                }

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<(bool, string)> UpdateProfileAsync(string userName, UpdateUserRequestDto userUpdate)
        {
            try
            {
                if (userUpdate == null)
                {
                    return (false, "Campi non validi");
                }

                var existingUser = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (existingUser == null)
                {
                    return (false, "Utente non esistente");
                }

                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userUpdate.UserName);
                if (user != null && user.UserName != existingUser.UserName)
                {
                    return (false, "Nome utente già in uso");
                }

                var userByEmail = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.Email == userUpdate.Email);
                if (userByEmail != null && userByEmail.Email != existingUser.Email)
                {
                    return (false, "Email già in uso");
                }

                existingUser.UserName = userUpdate.UserName;
                existingUser.NormalizedUserName = userUpdate.UserName.ToUpper();
                existingUser.FirstName = userUpdate.FirstName;
                existingUser.LastName = userUpdate.LastName;
                existingUser.Email = userUpdate.Email;
                existingUser.NormalizedEmail = userUpdate.Email.ToUpper();
                existingUser.PhoneNumber = userUpdate.PhoneNumber;

                return (await SaveAsync(), "Informazioni del profilo aggiornate con successo");
            }
            catch
            {
                return (false, "Ops qualcosa è andato storto");
            }
        }

        public async Task<GetProfileDto?> GetProfileAsync(string email)
        {
            try
            {
                var profile = await _context.ApplicationUsers.FirstOrDefaultAsync(p => p.Email == email);
                if (profile == null) 
                { 
                    return null;
                }

                var newProfile = new GetProfileDto()
                { 
                    FirstName = profile.FirstName,
                    LastName = profile.LastName,
                    UserName = profile.UserName,
                    Email = profile.Email,
                    ImageProfile = profile.ImageProfile,
                    Phone = profile.PhoneNumber,
                    BirthDate= profile.BirthDate 
                };

                return newProfile;
            }
            catch
            {
                return null;
            }
        }
    }
}
