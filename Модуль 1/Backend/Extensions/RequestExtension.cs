using Backend.Models;

namespace Backend.Extensions
{
    public static class RequestExtension
    {
        //selectBy => 1 - новые, 2 - закрытые, 3 - текущие (в процессе ремонта)
        public static IQueryable<Request> SelectBy(this IQueryable<Request> query, int? selectBy)
        {
            return selectBy switch
            {
                1 => query.Where(x => x.requeststatus == "Новая заявка"),
                2 => query.Where(x => x.requeststatus == "Готова к выдаче"),
                3 => query.Where(x => x.requeststatus == "В процессе ремонта"),
                _ => query,
            };
        }

        public static IQueryable<Request> FilterBy(this IQueryable<Request> query, string? techType, string? techModel)
        {
            if (!string.IsNullOrEmpty(techType))
            {
                query = query.Where(x => x.hometechtype == techType);
            }

            if (!string.IsNullOrEmpty(techModel))
            {
                query = query.Where(x => x.hometechmodel == techModel);
            }

            return query;
        }
    }
}
