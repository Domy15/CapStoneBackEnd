using CapStoneBackEnd.Data;
using CapStoneBackEnd.DTOs.Comment;
using CapStoneBackEnd.Models.VideoGames;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBackEnd.Services
{
    public class CommentService
    {
        private readonly ApplicationDbContext _context;

        public CommentService(ApplicationDbContext context)
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

        public async Task<List<GetCommentDto>?> GetCommentsByGameAsync(Guid id)
        {
            try
            {
                var comments = await _context.Comments.Where(c => c.IdGame == id).Include(c => c.ApplicationUser).ToListAsync();

                var commentsList = new List<GetCommentDto>();

                foreach (var comment in comments) 
                {
                    var newComment = new GetCommentDto()
                    { 
                        Id = comment.Id,
                        Content = comment.Content,
                        UserName = comment.ApplicationUser.UserName,
                        IdGame = comment.IdGame,
                        PublishedAt = comment.PublishedAt
                    };
                    commentsList.Add(newComment);
                }

                return commentsList;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<GetCommentProfileDto>?> GetCommentsByUserNameAsync(string userName)
        {
            try
            {
                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == userName);
                if (user == null)
                {
                    return null;
                }

                var comments = await _context.Comments.Where(c => c.IdUser == user.Id).Include(c => c.VideoGame).ToListAsync();

                var commentsList = new List<GetCommentProfileDto>();

                foreach (var comment in comments)
                {
                    var newComment = new GetCommentProfileDto()
                    {
                        Id = comment.Id,
                        Content = comment.Content,
                        UserName = userName,
                        GameTitle = comment.VideoGame.Title,
                        GameCover = comment.VideoGame.Cover,
                        PublishedAt = comment.PublishedAt
                    };
                    commentsList.Add(newComment);
                }

                return commentsList;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> AddCommentAsync(AddCommentDto addCommentDto)
        {
            try
            {
                if (addCommentDto == null) 
                {
                    return false;
                }

                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == addCommentDto.userName);
                if (user == null)
                {
                    return false;
                }

                var game = await _context.VideoGames.FirstOrDefaultAsync(g => g.Id == addCommentDto.IdGame);
                if (game == null)
                {
                    return false;
                }

                var newComment = new Comment()
                { 
                    Content = addCommentDto.Content, 
                    IdUser = user.Id,
                    IdGame = game.Id
                };

                _context.Comments.Add(newComment);

                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateCommentAsync(string content)
        {
            try
            {
                return await SaveAsync();
            }
            catch
            {
                return false;
            }
        }
    }
}
