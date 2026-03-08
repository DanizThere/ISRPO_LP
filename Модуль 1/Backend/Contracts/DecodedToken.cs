using System.Security.Claims;

namespace Backend.Contracts
{
    public record DecodedToken(string userId, string userRole, int exp);
}
