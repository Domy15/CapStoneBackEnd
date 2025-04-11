using CapStoneBackEnd.Data;
using CapStoneBackEnd.DTOs.Game;
using CapStoneBackEnd.Models.VideoGames;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBackEnd.Services
{
    public class CartService
    {
        private readonly ApplicationDbContext _context;

        public CartService(ApplicationDbContext context)
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

        public async Task<List<GameDto>?> GetCartAsync(string userName)
        {
            try
            {
                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (user == null) 
                {
                    return null;
                }

                var cart = await _context.Carts.Where(c => c.UserId == user.Id).Include(c => c.VideoGame).ThenInclude(g => g.GameCategories).ThenInclude(cg => cg.Category).Include(l => l.VideoGame.Company).ToListAsync();

                var gameList = new List<GameDto>();

                foreach (var game in cart)
                {
                    var newGame = new GameDto()
                    {
                        Id = game.GameId,
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

        public async Task<bool> AddToCartAsync(Guid idGame, string userName)
        {
            try
            {
                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (user == null) 
                {
                    return false;
                }

                var game = await _context.VideoGames.FirstOrDefaultAsync(g => g.Id == idGame);
                if (game == null)
                {
                    return false;
                }

                bool alreadyInCart = await _context.Carts.AnyAsync(w => w.GameId == idGame && w.UserId == user.Id);
                if (alreadyInCart)
                {
                    return false;
                }

                var newGame = new Cart()
                {
                    GameId = idGame,
                    UserId = user.Id
                };

                _context.Carts.Add(newGame);

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> RemoveFromCartAsync(Guid idGame, string userName)
        {
            try
            {
                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (user == null)
                {
                    return false;
                }

                var gameInCart = await _context.Carts.FirstOrDefaultAsync(w => w.GameId == idGame && w.UserId == user.Id);
                if (gameInCart == null)
                {
                    return false;
                }

                _context.Carts.Remove(gameInCart);

                return await SaveAsync();
            }
            catch 
            { 
                return false;
            }
        }

        public async Task<bool> EmptyCartAsync(string userName)
        {
            try
            {
                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (user == null) 
                {
                    return false;
                }

                var gamesInCart = await _context.Carts.Where(c => c.UserId == user.Id).ToListAsync();
                if (!gamesInCart.Any()) 
                { 
                    return false; 
                }

                foreach (var game in gamesInCart) 
                {
                    _context.Carts.Remove(game);
                }

                return await SaveAsync();
            }
            catch 
            {
                return false; 
            }
        }
    }
}
