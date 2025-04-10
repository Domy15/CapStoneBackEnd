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

        public async Task<GetGamesResponseDto?> GetAllGamesAsync()
        {
            try
            {
                var games = await _context.VideoGames.Include(g => g.ExtraImages).Include(g => g.Company).Include(g => g.GameCategories).ThenInclude(gc => gc.Category).ToListAsync();

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
                        }).ToList(),
                        ExtraImages = g.ExtraImages.Select(ei => new ExtraImageDto 
                        {
                            Id = ei.Id,
                            Image = ei.Image
                        }).ToList(),
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
                var existingGame = await _context.VideoGames.Include(g => g.ExtraImages).Include(g => g.Company).Include(g => g.GameCategories).ThenInclude(gc => gc.Category).FirstOrDefaultAsync(g => g.Id == id);
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
                    }).ToList(),
                    ExtraImages = existingGame.ExtraImages.Select(ei => new ExtraImageDto
                    {
                        Id = ei.Id,
                        Image = ei.Image
                    }).ToList(),
                };

                return game;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> AddGameAsync(AddGameDto addGameDto)
        {
            try
            {
                if(addGameDto == null)
                {
                    return false;
                }

                string webPath = null;
                if (addGameDto.Cover != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(addGameDto.Cover.FileName);
                    var imageDir = Path.Combine(Directory.GetCurrentDirectory(), "assets", "images");

                    if (!Directory.Exists(imageDir))
                        Directory.CreateDirectory(imageDir);

                    var filePath = Path.Combine(imageDir, fileName);

                    await using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await addGameDto.Cover.CopyToAsync(stream);
                    }

                    webPath = $"assets/images/{fileName}";
                }

                var newGame = new VideoGame()
                {
                    Title = addGameDto.Title,
                    Description = addGameDto.Description,
                    Price = addGameDto.Price,
                    ReleaseDate = addGameDto.ReleaseDate,
                    Cover = webPath,
                    CompanyId = addGameDto.CompanyId,
                };

                _context.VideoGames.Add(newGame);
                await _context.SaveChangesAsync();

                foreach (var category in addGameDto.CategoriesId)
                {
                    var gameCategory = new GameCategory()
                    {
                        CategoryId = category,
                        GameId = newGame.Id
                    };
                    _context.GameCategories.Add(gameCategory);
                }

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateGameAsync(Guid id, UpdateGameDto updateGameDto)
        {
            try
            {
                if (updateGameDto == null)
                {
                    return false;
                }

                var game = await _context.VideoGames.FirstOrDefaultAsync(g => g.Id == id);
                if (game == null) 
                {
                    return false;
                }

                if (updateGameDto.Cover != null && updateGameDto.Cover.Length > 0) 
                {
                    if (!string.IsNullOrEmpty(game.Cover)) 
                    {
                        var relativePath = game.Cover.Replace("/", Path.DirectorySeparatorChar.ToString())
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

                    var fileExtension = Path.GetExtension(updateGameDto.Cover.FileName);
                    var fileName = Guid.NewGuid().ToString() + fileExtension;

                    var filePath = Path.Combine(uploadDirectory, fileName);

                    await using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await updateGameDto.Cover.CopyToAsync(stream);
                    }

                    game.Cover = Path.Combine("assets", "images", fileName).Replace("\\", "/");
                }
                game.Description = updateGameDto.Description;
                game.Price = updateGameDto.Price;

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteGameAsync(Guid id)
        {
            try
            {
                var game = await _context.VideoGames.FirstOrDefaultAsync(g => g.Id == id);
                if (game == null) 
                { 
                    return false;
                }

                _context.VideoGames.Remove(game);

                return await SaveAsync();
            }
            catch 
            {
                return false;
            }
        }

        public async Task<bool> AddExtraImageAsync(Guid id, AddExtraImageDto addExtraImageDto)
        {
            try
            {
                var game = await _context.VideoGames.FirstOrDefaultAsync(g => g.Id == id);
                if (game == null) 
                {
                    return false;
                }

                var imageDir = Path.Combine(Directory.GetCurrentDirectory(), "assets", "images");

                if (!Directory.Exists(imageDir))
                    Directory.CreateDirectory(imageDir);

                foreach (var image in addExtraImageDto.ExtraImages)
                {
                    if (image != null && image.Length > 0) 
                    {
                        var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                        var filePath = Path.Combine(imageDir, fileName);

                        await using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        var webPath = $"assets/images/{fileName}";

                        var extraImage = new ExtraImage()
                        {
                            GameId = id,
                            Image = webPath
                        };

                        _context.ExtraImages.Add(extraImage);
                    }
                }

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteExtraImageAsync(Guid id)
        {
            try
            {
                var extraImage = await _context.ExtraImages.FirstOrDefaultAsync(i => i.Id == id);
                if (extraImage == null)
                {
                    return false;
                }

                _context.ExtraImages.Remove(extraImage);

                return await SaveAsync();
            }
            catch 
            { 
                return false;
            }
        }
    }
}
