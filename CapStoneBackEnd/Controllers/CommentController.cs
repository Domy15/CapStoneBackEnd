﻿using CapStoneBackEnd.DTOs.Comment;
using CapStoneBackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace CapStoneBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentService _commentService;

        public CommentController(CommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("getByGame/{id}")]
        public async Task<IActionResult> GetComments(Guid id)
        {
            try
            {
                var comments = await _commentService.GetCommentsByGameAsync(id);
                if (comments == null)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { comments });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [HttpGet("getByUserName/{userName}")]
        public async Task<IActionResult> GetComments(string userName)
        {
            try
            {
                var comments = await _commentService.GetCommentsByUserNameAsync(userName);
                if (comments == null)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { comments });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] AddCommentDto addCommentDto)
        {
            try
            {
                var result = await _commentService.AddCommentAsync(addCommentDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Commento aggiunto" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(Guid id, [FromBody] string Content)
        {
            try
            {
                var result = await _commentService.UpdateCommentAsync(id, Content);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Commento aggiornato" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            try
            {
                var result = await _commentService.DeleteCommentAsync(id);
                if (!result)
                {
                    return BadRequest(new { message = "Ops qualcosa è andato storto!" });
                }

                return Ok(new { message = "Commento eliminato" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, ex.Message);
                return StatusCode(500, new { message = "Ops qualcosa è andato storto. Riprova più tardi!" });
            }
        }
    }
}
