using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DB
{
    public class ApplicationContext(DbContextOptions<ApplicationContext> options) : DbContext(options)
    {
        public DbSet<Comment> comments { get; set; }
        public DbSet<Request> requests { get; set; }
        public DbSet<User> users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Request>()
                .Property(x => x.requestid)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<User>()
                .Property(x => x.userid)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Comment>()
                .Property(x => x.commentid)
                .ValueGeneratedOnAdd();
        }
    }
}
