using System.ComponentModel.DataAnnotations;

namespace CapStoneBackEnd.DTOs.Category
{
    public class GetCategoryDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
    }
}
