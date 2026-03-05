using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Request
    {
        [Key]
        public int requestID { get; set; }
        public DateOnly startDate { get; set; }
        public string homeTechType { get; set; }
        public string homeTechModel { get; set; }
        public string problemDescription { get; set; }
        public string requestStatus { get; set; }
        public DateOnly completionDate { get; set; }
        public string? repairParts { get; set; }
        public int masterID {  get; set; }
        public int clientID { get; set; }
    }
}
