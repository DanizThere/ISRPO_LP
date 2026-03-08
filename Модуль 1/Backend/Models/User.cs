using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        [Key]
        public int userid { get; set; }
        public required string fio {  get; set; }
        public required string login { get; set; }
        public required string password { get; set; }
        public string type { get; set; } = "Заказчик";
    }
}
