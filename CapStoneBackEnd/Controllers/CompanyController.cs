﻿using CapStoneBackEnd.DTOs.Company;
using CapStoneBackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace CapStoneBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly CompanyService _companyService;

        public CompanyController(CompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCompanies()
        {
            try
            {
                var companies = await _companyService.GetAllComapaniesAsync();
                if (companies == null)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { companies });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] AddCompanyDto addCompanyDto)
        {
            try
            {
                var result = await _companyService.AddCompanyAsync(addCompanyDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Compagnia aggiunta con successo!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(Guid id)
        {
            try
            {
                var result = await _companyService.DeleteCompanyAsync(id);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Compagnia eliminata con successo!" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }
    }
}
