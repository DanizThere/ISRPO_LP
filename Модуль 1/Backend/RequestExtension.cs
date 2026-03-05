using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend
{
    public static class RequestExtension
    {
        //selectBy => 1 - новые, 2 - закрытые, 3 - текущие (в процессе ремонта)
        public static IQueryable<Request> SelectBy(this IQueryable<Request> query, int? selectBy)
        {
            return selectBy switch
            {
                1 => query.Where(x => x.requestStatus == "Новая заявка"),
                2 => query.Where(x => x.requestStatus == "Готова к выдаче"),
                3 => query.Where(x => x.requestStatus == "В процессе ремонта"),
                _ => query,
            };
        }

        public static IQueryable<Request> FilterBy(this IQueryable<Request> query, string? techType, string? techModel)
        {
            if (!string.IsNullOrEmpty(techType))
            {
                query = query.Where(x => x.homeTechType == techType);
            }

            if (!string.IsNullOrEmpty(techModel))
            {
                query = query.Where(x => x.homeTechModel == techModel);
            }

            return query;
        }
    }
}
