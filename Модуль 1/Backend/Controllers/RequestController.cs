using Backend.Contracts;
using Backend.DB;
using Backend.Extensions;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController(ApplicationContext dbContext) : ControllerBase
    {
        private readonly ApplicationContext _dbContext = dbContext;

        [Authorize]
        [HttpGet("get")]
        public async Task<ActionResult<IEnumerable<Request>>> GetAll()
        {
            var cookie = HttpContext.Request.Cookies["cookie"];
            if (string.IsNullOrEmpty(cookie)) return Unauthorized();

            var payload = JWTDecoder.Decoder.DecodePayload<DecodedToken>(cookie);

            switch (payload.userRole)
            {
                case "Админ":
                case "Оператор":
                case "Менеджер":
                    var requestManager = await _dbContext.requests
                        .AsNoTracking()
                        .ToListAsync();

                    if (requestManager is null) return NotFound("Заявок нет.");
                    return Ok(requestManager);
                case "Мастер":
                    var requestMaster = await _dbContext.requests.Where(x => x.masterid == Convert.ToInt32(payload.userId))
                        .AsNoTracking()
                        .ToListAsync();

                    if (requestMaster is null) return NotFound("Заявок нет.");
                    return Ok(requestMaster);
                case "Заказчик":
                default:
                    var request = await _dbContext.requests.Where(x => x.clientid == Convert.ToInt32(payload.userId))
                        .AsNoTracking()
                        .ToListAsync();

                    if (request is null) return NotFound("Заявок нет.");
                    return Ok(request);
            }
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] Request request)
        {
            try
            {
                _dbContext.requests.Add(request);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest($"{ex.Message}.\n{ex.StackTrace}.\n{ex.InnerException}");

            }
        }

        [Authorize]
        [HttpGet("filter")]
        //selectBy => 1 - новые, 2 - закрытые, 3 - текущие (в процессе ремонта)
        public async Task<ActionResult<IEnumerable<Request>>> GetByFilter([FromQuery] int? selectBy, [FromQuery] string? techType, [FromQuery] string? techModel)
        {
            var cookie = HttpContext.Request.Cookies["cookie"];
            if (string.IsNullOrEmpty(cookie)) return Unauthorized();

            var payload = JWTDecoder.Decoder.DecodePayload<DecodedToken>(cookie);

            switch (payload.userRole)
            {
                case "Админ":
                case "Оператор":
                case "Менеджер":
                    var requestManager = await _dbContext.requests
                        .AsNoTracking()
                        .SelectBy(selectBy)
                        .FilterBy(techType, techModel)
                        .ToListAsync();

                    if (requestManager is null) return NotFound("Заявок нет.");
                    return Ok(requestManager);
                case "Мастер":
                    var requestMaster = await _dbContext.requests.Where(x => x.masterid == Convert.ToInt32(payload.userId))
                        .AsNoTracking()
                        .SelectBy(selectBy)
                        .FilterBy(techType, techModel)
                        .ToListAsync();

                    if (requestMaster is null) return NotFound("Заявок нет.");
                    return Ok(requestMaster);
                case "Заказчик":
                default:
                    var request = await _dbContext.requests.Where(x => x.clientid == Convert.ToInt32(payload.userId))
                        .AsNoTracking()
                        .SelectBy(selectBy)
                        .FilterBy(techType, techModel)
                        .ToListAsync();

                    if (request is null) return NotFound("Заявок нет.");
                    return Ok(request);
            }
        }

        [Authorize]
        [HttpPatch("update")]
        public async Task<ActionResult<Request>> Update([FromBody] Request request)
        {
            var response = await _dbContext.requests.Where(x => x.requestid == request.requestid).ExecuteUpdateAsync(
                x => x
                .SetProperty(y => y.repairparts, y => request.repairparts)
                .SetProperty(y => y.masterid, y => request.masterid)
                .SetProperty(y => y.completiondate, y => request.completiondate)
                .SetProperty(y => y.requeststatus, y => request.requeststatus)
                .SetProperty(y => y.problemdescryption, y => request.problemdescryption)
                .SetProperty(y => y.hometechmodel, y => request.hometechmodel)
                .SetProperty(y => y.hometechtype, y => request.hometechtype));

            return request;
        }

        [Authorize(Roles = "Менеджер, Оператор, Админ")]
        [HttpPatch("setMaster")]
        public async Task<ActionResult<Request>> SetMaster([FromQuery] int requestId, [FromQuery] int masterId)
        {
            var user = await _dbContext.users.FirstOrDefaultAsync(x => x.userid == masterId);

            if (user?.type is not "Мастер") return BadRequest("Данный пользователь не является мастером.");

            var request = await _dbContext.requests.Where(x => x.requestid == requestId)
                .ExecuteUpdateAsync(x => x.SetProperty(y => y.masterid, y => masterId));

            return Ok(request);
        }

        [Authorize(Roles = "Мастер, Менеджер, Оператор, Админ")]
        [HttpPatch("setStatus")]
        public async Task<ActionResult<Request>> SetStatus([FromQuery] int requestId, [FromQuery] string status)
        {
            var request = await _dbContext.requests.Where(x => x.requestid == requestId)
                .ExecuteUpdateAsync(x => x.SetProperty(y => y.requeststatus, y => status));

            return Ok(request);
        }
    }
}
