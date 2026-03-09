using Backend.DB;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController(ApplicationContext dbContext) : ControllerBase
    {
        private readonly ApplicationContext _dbContext = dbContext;

        [Authorize]
        [HttpPost("add")]
        public async Task<ActionResult<Comment>> Create(Comment comment)
        {
            _dbContext.comments.Add(comment);
            await _dbContext.SaveChangesAsync();
            return Ok(comment);
        }

        [Authorize]
        [HttpGet("request/{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetAllByRequest(int id)
        {
            var comments = await _dbContext.comments.Where(x => x.requestid == id)
                .OrderBy(x => x.commentid)
                .ToListAsync();

            if (!comments.Any()) return NotFound();

            return Ok(comments);
        }

    }
}
