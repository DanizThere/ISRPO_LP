using Backend.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(ApplicationContext dbContext, IConfiguration configuration) : ControllerBase
    {
        private readonly ApplicationContext _dbContext = dbContext;
        private readonly IConfiguration _configuration = configuration;

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(string login, string password)
        {
            var user = await _dbContext.users.FirstOrDefaultAsync(x => x.login == login && x.password == password);

            if(user is null) return Unauthorized();

            var claims = new List<Claim> {
                new("userId", user.userID.ToString()),
                new(ClaimTypes.Role, user.type)
            };

            var signingCreditals = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"])), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(signingCredentials: signingCreditals,
                expires: DateTime.UtcNow.AddHours(Convert.ToInt32(_configuration["JWT:ExpiredHours"])),
                claims: claims);

            var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenValue;
        }

        [HttpPost("reg")]
        public async Task<ActionResult> Create([FromBody] User user)
        {
            var dbUser = await _dbContext.users.FirstOrDefaultAsync(x => x.login == user.login || x.userID == user.userID);

            if (dbUser is not null) return BadRequest("Пользователь с данным логином уже существует");

            _dbContext.users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpPost("reg/master")]
        public async Task<ActionResult> CreateMaster([FromBody] User user)
        {
            var dbUser = await _dbContext.users.FirstOrDefaultAsync(x => x.login == user.login || x.userID == user.userID);

            if (dbUser is not null) return BadRequest("Пользователь с данным логином уже существует");

            user.type = "Мастер";

            _dbContext.users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpPost("reg/manager")]
        public async Task<ActionResult> CreateManager([FromBody] User user)
        {
            var dbUser = await _dbContext.users.FirstOrDefaultAsync(x => x.login == user.login || x.userID == user.userID);

            if (dbUser is not null) return BadRequest("Пользователь с данным логином уже существует");

            user.type = "Менеджер";

            _dbContext.users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpPost("reg/operator")]
        public async Task<ActionResult> CreateOperator([FromBody] User user)
        {
            var dbUser = await _dbContext.users.FirstOrDefaultAsync(x => x.login == user.login || x.userID == user.userID);

            if (dbUser is not null) return BadRequest("Пользователь с данным логином уже существует");

            user.type = "Оператор";

            _dbContext.users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
