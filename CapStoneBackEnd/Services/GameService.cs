using CapStoneBackEnd.Data;
using CapStoneBackEnd.DTOs.Game;
using CapStoneBackEnd.Models.VideoGames;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBackEnd.Services
{
    public class GameService
    {
        private readonly ApplicationDbContext _context;

        public GameService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GetGamesResponseDto?> GetAllGamesAsync()
        {
            try
            {
                var games = await _context.VideoGames.Include(g => g.Company).Include(g => g.GameCategories).ThenInclude(gc => gc.Category).ToListAsync();

                var gamesList = new GetGamesResponseDto()
                { 
                    Games = games.Select(g => new GameDto
                    {
                        Id = g.Id,
                        Title = g.Title,
                        Description = g.Description,
                        Price = g.Price,
                        ReleaseDate = g.ReleaseDate,
                        Cover = g.Cover,
                        Company = g.Company.Name,
                        Categories = g.GameCategories.Select(gc => new CategoryDto
                        {
                            Name = gc.Category.Name
                        }).ToList()
                    }).ToList()
                };

                return gamesList;
            }
            catch
            {
                return null;
            }
        }

        public async Task<GameDto?> GetGameAsync(Guid id)
        {
            try
            {
                var existingGame = await _context.VideoGames.Include(g => g.Company).Include(g => g.GameCategories).ThenInclude(gc => gc.Category).FirstOrDefaultAsync(g => g.Id == id);
                if (existingGame == null)
                {
                    return null;
                }

                var game = new GameDto()
                {
                    Id = existingGame.Id,
                    Title = existingGame.Title,
                    Description = existingGame.Description,
                    Price = existingGame.Price,
                    ReleaseDate = existingGame.ReleaseDate,
                    Cover = existingGame.Cover,
                    Company = existingGame.Company.Name,
                    Categories = existingGame.GameCategories.Select(gc => new CategoryDto
                    {
                        Name = gc.Category.Name
                    }).ToList()
                };

                return game;
            }
            catch
            {
                return null;
            }
        }
    }
}
