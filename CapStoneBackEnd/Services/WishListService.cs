using CapStoneBackEnd.Data;
using CapStoneBackEnd.DTOs.Game;
using CapStoneBackEnd.Models.VideoGames;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBackEnd.Services
{
    public class WishListService
    {
        private readonly ApplicationDbContext _context;

        public WishListService (ApplicationDbContext context)
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

        public async Task<List<GameDto>?> GetWishListAsync(string userName)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userName))
                {
                    return null;
                }

                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (user == null)
                {
                    return null;
                }

                var games = await _context.WishLists.Where(w => w.IdUser == user.Id).Include(w => w.VideoGame).ThenInclude(g => g.GameCategories).ThenInclude(cg => cg.Category).Include(w => w.VideoGame.Company).ToListAsync();

                var gameList = new List<GameDto>();

                foreach (var game in games) 
                {
                    var newGame = new GameDto()
                    {
                        Id = game.IdGame,
                        Title = game.VideoGame.Title,
                        Description = game.VideoGame.Description,
                        Price = game.VideoGame.Price,
                        ReleaseDate = game.VideoGame.ReleaseDate,
                        Cover = game.VideoGame.Cover,
                        CoverLarge = game.VideoGame.CoverLarge,
                        Company = game.VideoGame.Company.Name,
                        Categories = game.VideoGame.GameCategories.Select(gc => new CategoryDto 
                        { 
                            Name = gc.Category.Name
                        }).ToList(),
                    };
                    gameList.Add(newGame);
                }

                return gameList;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> AddGameToWishListAsync(Guid idGame, string userName)
        {
            try
            {
                if (idGame == Guid.Empty || string.IsNullOrWhiteSpace(userName))
                {
                    return false;
                }

                var existingGame = await _context.VideoGames.FirstOrDefaultAsync(g => g.Id == idGame);
                if (existingGame == null) 
                {
                    return false;
                }

                var existingUser = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (existingUser == null) 
                { 
                    return false;
                }

                var alreadyInWishList = await _context.WishLists.AnyAsync(w => w.IdGame == idGame && w.IdUser == existingUser.Id);
                if (alreadyInWishList)
                {
                    return false;
                }

                var newWish = new WishList()
                { 
                    IdGame = idGame,
                    IdUser = existingUser.Id
                };

                _context.WishLists.Add(newWish);

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> RemoveFromWishListAsync(Guid idGame,string userName)
        {
            try
            {
                if (idGame == Guid.Empty || string.IsNullOrWhiteSpace(userName))
                {
                    return false;
                }

                var existingUser = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (existingUser == null)
                {
                    return false;
                }

                var wishEntry = await _context.WishLists.FirstOrDefaultAsync(w => w.IdGame == idGame && w.IdUser == existingUser.Id);
                if (wishEntry == null)
                {
                    return false;
                }

                _context.WishLists.Remove(wishEntry);

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }
    }
}
