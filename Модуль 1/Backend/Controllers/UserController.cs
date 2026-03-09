using Backend.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Backend.Contracts;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(ApplicationContext dbContext, IConfiguration configuration) : ControllerBase
    {
        private readonly ApplicationContext _dbContext = dbContext;
        private readonly IConfiguration _configuration = configuration;

        [HttpGet("get/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _dbContext.users.FirstOrDefaultAsync(x => x.userid == id);

            if (user is null) return NotFound();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] Login login)
        {
            var user = await _dbContext.users.FirstOrDefaultAsync(x => x.login == login.login && x.password == login.password);

            if(user is null) return Unauthorized();

            var claims = new List<Claim> {
                new("userId", user.userid.ToString()),
                new("userRole", user.type),
                new(ClaimTypes.Role, user.type)
            };

            var signingCreditials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"])), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(signingCredentials: signingCreditials,
                expires: DateTime.UtcNow.AddHours(Convert.ToInt32(_configuration["JWT:ExpiredHours"])),
                claims: claims);

            var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

            HttpContext.Response.Cookies.Append("cookie", tokenValue);

            return Ok(tokenValue);
        }

        [HttpPost("reg")]
        public async Task<ActionResult> Create([FromBody] User user)
        {
            var dbUser = await _dbContext.users.FirstOrDefaultAsync(x => x.login == user.login || x.userid == user.userid);

            if (dbUser is not null) return BadRequest("Пользователь с данным логином уже существует");

            _dbContext.users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Roles = "Админ")]
        [HttpPost("reg/master")]
        public async Task<ActionResult> CreateMaster([FromBody] User user)
        {
            var dbUser = await _dbContext.users.FirstOrDefaultAsync(x => x.login == user.login || x.userid == user.userid);

            if (dbUser is not null) return BadRequest("Пользователь с данным логином уже существует");

            user.type = "Мастер";

            _dbContext.users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Roles = "Админ")]
        [HttpPost("reg/manager")]
        public async Task<ActionResult> CreateManager([FromBody] User user)
        {
            var dbUser = await _dbContext.users.FirstOrDefaultAsync(x => x.login == user.login || x.userid == user.userid);

            if (dbUser is not null) return BadRequest("Пользователь с данным логином уже существует");

            user.type = "Менеджер";

            _dbContext.users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Roles = "Админ")]
        [HttpPost("reg/operator")]
        public async Task<ActionResult> CreateOperator([FromBody] User user)
        {
            var dbUser = await _dbContext.users.FirstOrDefaultAsync(x => x.login == user.login || x.userid == user.userid);

            if (dbUser is not null) return BadRequest("Пользователь с данным логином уже существует");

            user.type = "Оператор";

            _dbContext.users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
