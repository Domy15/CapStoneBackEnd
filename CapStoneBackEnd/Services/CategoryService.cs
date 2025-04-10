using CapStoneBackEnd.Data;
using CapStoneBackEnd.DTOs.Category;
using CapStoneBackEnd.Models.VideoGames;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBackEnd.Services
{
    public class CategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
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

        public async Task<List<GetCategoryDto>?> GetAllCategoriesAsync()
        {
            try
            {
                var categories = await _context.Categories.ToListAsync();

                var categoryList = new List<GetCategoryDto>();

                foreach (var category in categories) 
                {
                    var newCategory = new GetCategoryDto()
                    {
                        Id = category.Id,
                        Name = category.Name
                    };
                    categoryList.Add(newCategory);
                }

                return categoryList;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> AddCategoryAsync(AddCategoryDto addCategoryDto)
        {
            try
            {
                if (addCategoryDto == null) 
                {
                    return false;
                }

                var existingCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Name == addCategoryDto.Name);
                if (existingCategory != null)
                {
                    return false;
                }

                var newCategory = new Category()
                { 
                    Name = addCategoryDto.Name 
                };

                _context.Categories.Add(newCategory);

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            try
            {
                var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
                if (category == null)
                {
                    return false;
                }

                _context.Categories.Remove(category);

                return await SaveAsync();
            }
            catch 
            { 
                return false;
            }
        }
    }
}
