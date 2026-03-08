using Backend.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController(ApplicationContext dbContext) : ControllerBase
    {
        private readonly ApplicationContext _dbContext = dbContext;

        [Authorize(Roles = "Менеджер, Оператор, Админ")]
        [HttpGet("solvedRequests")]
        public async Task<ActionResult<string>> GetSolvedRequests()
        {
            try
            {
                var requiredRequest = await _dbContext.requests
                    .Where(x => x.requeststatus == "Готова к выдаче")
                    .ToListAsync();

                var response = new StringBuilder($"Количество выполненных заявок: {requiredRequest.Count}\n");
                response.Append(string.Join(' ',
                    requiredRequest.Select(x => $"Тип: {x.hometechmodel}. Модель: {x.hometechmodel}\n")));

                return Ok(response.ToString());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("averageTime")]
        public async Task<ActionResult<string>> GetAverageTime()
        {
            try
            {
                var time = await _dbContext.requests
                    .Where(x => x.completiondate != null)
                    .Select(x => new { time = x.completiondate.Value.DayNumber - x.startdate.DayNumber })
                    .ToListAsync();

                var averageTime = time.Sum(x => x.time) / time.Count;

                return Ok($"Среднее время выполнение заявки: {averageTime} дней.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Менеджер, Оператор, Админ")]
        [HttpGet("injuresStatistic")]
        public async Task<ActionResult<List<string>>> GetInjuresStatistic()
        {
            try
            {
                var uniqueInjures = await _dbContext.requests
                    .GroupBy(x => x.problemdescryption)
                    .Select(x => new { type = x.First().problemdescryption, count = x.Count() })
                    .ToListAsync();

                var response = uniqueInjures
                    .OrderByDescending(x => x.count)
                    .Select(x => $"Тип: {x.type}. Количество: {x.count}")
                    .ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Менеджер, Оператор, Админ")]
        [HttpGet("requestStatistic/{id}")]
        public async Task<ActionResult<string>> GetRequestStatistic(int id)
        {
            try
            {
                var request = await _dbContext.requests.FirstOrDefaultAsync(x => x.requestid == id)
                     ?? throw new Exception("Данной заявки нет.");

                var user = await _dbContext.users.FirstOrDefaultAsync(x => x.userid == request.masterid);

                var userName = $"Мастер: {user?.fio ?? "не назначен"}.";
                var time = (request?.completiondate?.DayNumber - request?.startdate.DayNumber).ToString();
                var addition = string.IsNullOrEmpty(time) ? "Время ремонта: в процессе ремонта" : $"Время рем{time} дней";
                var resources = $"Затраченные ресурсы: {(string.IsNullOrEmpty(request?.repairparts) ? "не имеются" : request.repairparts)}";

                var statistic = string.Join('\n', userName, addition, resources);

                return Ok(statistic.ToString());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}