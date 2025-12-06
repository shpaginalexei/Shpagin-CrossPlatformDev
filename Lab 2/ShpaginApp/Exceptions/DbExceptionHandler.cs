using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace ShpaginApp.Exceptions
{
  public sealed class DbExceptionHandler : IExceptionHandler
  {
    public async ValueTask<bool> TryHandleAsync(
      HttpContext httpContext,
      Exception exception,
      CancellationToken cancellationToken)
    {
      if (exception is not DbUpdateException dbUpdateException) return false;

      var dbMessage = dbUpdateException.InnerException?.Message ?? dbUpdateException.Message;
      await HandleException.HandleAsync(httpContext, new AppError
      {
        Status = StatusCodes.Status400BadRequest,
        ErrorCode = ErrorCodeEnum.DATABASE_ERROR,
        Message = dbMessage
      });
      return true;
    }
  }
}
