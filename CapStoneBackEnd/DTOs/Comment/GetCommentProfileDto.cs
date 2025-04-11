namespace CapStoneBackEnd.DTOs.Comment
{
    public class GetCommentProfileDto
    {
        public Guid Id { get; set; }
        public required string Content { get; set; }
        public required string UserName { get; set; }
        public required string GameTitle { get; set; }
        public required string GameCover { get; set; }
        public DateTime PublishedAt { get; set; }
    }
}
