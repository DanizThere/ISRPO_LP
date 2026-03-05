using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Comment
    {
        [Key]
        public int commentID { get; set; }
        public required string message { get; set; }
        public int masterID { get; set; }
        public int requestID { get; set; }
    }
}
