using System.ComponentModel.DataAnnotations;

namespace CapStoneBackEnd.DTOs.Company
{
    public class GetCompanyDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
    }
}
