using Backend.DB;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<IEnumerable<Request>>> GetAll([FromQuery] string type, [FromQuery] int id)
        {
            switch (type) 
            {
                case "Оператор":
                case "Менеджер":
                    var requestManager = await _dbContext.requests
                        .AsNoTracking()
                        .ToListAsync();

                    if (requestManager is null) return NotFound("Заявок нет.");
                    return Ok(requestManager);
                case "Мастер":
                    var requestMaster = await _dbContext.requests.Where(x => x.masterID == id)
                        .AsNoTracking()
                        .ToListAsync();

                    if (requestMaster is null) return NotFound("Заявок нет.");
                    return Ok(requestMaster);
                case "Заказчик":
                default:
                    var request = await _dbContext.requests.Where(x => x.clientID == id)
                        .AsNoTracking()
                        .ToListAsync();

                    if (request is null) return NotFound("Заявок нет.");
                    return Ok(request);
            }
        }

        [Authorize]
        [HttpGet("filter")]
        //selectBy => 1 - новые, 2 - закрытые, 3 - текущие (в процессе ремонта)
        public async Task<ActionResult<IEnumerable<Request>>> GetByFilter([FromQuery] string type, [FromQuery] int id, [FromQuery] int? selectBy, [FromQuery] string? techType, [FromQuery] string? techModel)
        {
            switch (type)
            {
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
                    var requestMaster = await _dbContext.requests.Where(x => x.masterID == id)
                        .AsNoTracking()
                        .SelectBy(selectBy)
                        .FilterBy(techType, techModel)
                        .ToListAsync();

                    if (requestMaster is null) return NotFound("Заявок нет.");
                    return Ok(requestMaster);
                case "Заказчик":
                default:
                    var request = await _dbContext.requests.Where(x => x.clientID == id)
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
            var response = await _dbContext.requests.Where(x => x.requestID == request.requestID).ExecuteUpdateAsync(
                x => x
                .SetProperty(y => y.repairParts, y => request.repairParts)
                .SetProperty(y => y.masterID, y => request.masterID)
                .SetProperty(y => y.completionDate, y => request.completionDate)
                .SetProperty(y => y.requestStatus, y => request.requestStatus)
                .SetProperty(y => y.problemDescription, y => request.problemDescription)
                .SetProperty(y => y.homeTechModel, y => request.homeTechModel)
                .SetProperty(y => y.homeTechType, y => request.homeTechType));

            return request;
        }
    }
}
