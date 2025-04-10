﻿using CapStoneBackEnd.Data;
using CapStoneBackEnd.DTOs.Company;
using CapStoneBackEnd.Models.VideoGames;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBackEnd.Services
{
    public class CompanyService
    {
        private readonly ApplicationDbContext _context;

        public CompanyService (ApplicationDbContext context)
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

        public async Task<List<GetCompanyDto>?> GetAllComapaniesAsync()
        {
            try
            {
                var companies = await _context.Companies.ToListAsync();
                if (companies == null)
                {
                    return null;
                }

                var companyList = new List<GetCompanyDto>();

                foreach (var company in companies) 
                {
                    var newCompany = new GetCompanyDto()
                    {
                        Id = company.Id,
                        Name = company.Name
                    };
                    companyList.Add(newCompany);
                }

                return companyList;
            }
            catch 
            {
                return null;
            }
        }

        public async Task<bool> AddCompanyAsync(AddCompanyDto addCompanyDto)
        {
            try
            {
                if (addCompanyDto == null) 
                {
                    return false;
                }

                var existingComapany = await _context.Companies.FirstOrDefaultAsync(c => c.Name == addCompanyDto.Name);
                if (existingComapany != null) 
                {
                    return false;
                }

                var newCompany = new Company()
                {
                    Name = addCompanyDto.Name
                };

                _context.Companies.Add(newCompany);

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteCompanyAsync(Guid id)
        {
            try
            {
                var existingCompany = await _context.Companies.FirstOrDefaultAsync(c => c.Id == id);
                if (existingCompany == null) 
                {
                    return false;
                }

                _context.Companies.Remove(existingCompany);

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }
    }
}
