using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DB
{
    public class ApplicationContext(DbContextOptions<ApplicationContext> options) : DbContext(options)
    {
        public DbSet<Comment> comments { get; set; }
        public DbSet<Request> requests { get; set; }
        public DbSet<User> users { get; set; }
    }
}
