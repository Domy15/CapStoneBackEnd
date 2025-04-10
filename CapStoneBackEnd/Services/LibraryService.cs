using CapStoneBackEnd.Data;
using CapStoneBackEnd.DTOs.Game;
using CapStoneBackEnd.Models.VideoGames;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBackEnd.Services
{
    public class LibraryService
    {
        private readonly ApplicationDbContext _context;

        public LibraryService(ApplicationDbContext context)
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

        public async Task<List<GameDto>?> GetLibraryAsync(string userName)
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

                var games = await _context.Libraries.Where(l => l.IdUser == user.Id).Include(l => l.VideoGame).ThenInclude(g => g.GameCategories).ThenInclude(cg => cg.Category).Include(l => l.VideoGame.Company).ToListAsync();

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

        public async Task<(bool, int)> AddGameToLibraryAsync(List<Guid> gameIds, string userName)
        {
            try
            {
                if (gameIds == null || !gameIds.Any() || string.IsNullOrWhiteSpace(userName))
                {
                    return (false, 0);
                }

                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (user == null)
                {
                    return (false, 0);
                }

                int count = 0;
                foreach (var idGame in gameIds) 
                {
                    var game = await _context.VideoGames.FirstOrDefaultAsync(g => g.Id == idGame);
                    if (game == null)
                    {
                        continue;
                    }

                    bool alreadyInLibrary = await _context.Libraries.AnyAsync(w => w.IdGame == idGame && w.IdUser == user.Id);
                    if (alreadyInLibrary)
                    {
                        continue;
                    }

                    var newGame = new Library()
                    {
                        IdGame = idGame,
                        IdUser = user.Id
                    };

                    _context.Libraries.Add(newGame);
                    count++;
                }

                if (count == 0) 
                {
                    return (false, 0);
                }

                return (await SaveAsync(), count);
            }
            catch
            {
                return (false, 0);
            }
        }
    }
}
