using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Comment
    {
        [Key]
        public int commentid { get; set; }
        public required string message { get; set; }
        public int masterid { get; set; }
        public int requestid { get; set; }
    }
}
