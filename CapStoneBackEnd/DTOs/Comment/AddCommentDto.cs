namespace CapStoneBackEnd.DTOs.Comment
{
    public class AddCommentDto
    {
        public required string Content { get; set; }
        public required string userName { get; set; }
        public required Guid IdGame { get; set; }
    }
}
