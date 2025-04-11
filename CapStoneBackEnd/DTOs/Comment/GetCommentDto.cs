using System.ComponentModel.DataAnnotations;

namespace CapStoneBackEnd.DTOs.Comment
{
    public class GetCommentDto
    {
        public Guid Id { get; set; }
        public required string Content { get; set; }
        public required string UserName { get; set; }
        public Guid IdGame { get; set; }
        public DateTime PublishedAt { get; set; }
    }
}
