using System.Text;
using FluentValidation;
using Humanizer;
using Microsoft.AspNetCore.Diagnostics;

namespace ShpaginApp.Exceptions
{
  public sealed class ValidationExceptionHandler : IExceptionHandler
  {
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
      if (exception is not ValidationException validationException)
      {
        return false;
      }

      var error = new AppError
      {
        Status = StatusCodes.Status400BadRequest,
        ErrorCode = ErrorCodeEnum.VALIDATION_ERROR,
        Message = "One or more validation errors occurred.",
        Details = validationException.Errors
          .Select(e => new ValidationErrorDetails(ToSnakeCase(e.PropertyName), e.ErrorMessage))
          .ToList()
      };

      await HandleException.HandleAsync(httpContext, error);
      return true;
    }

    private static string ToSnakeCase(string input)
    {
      if (string.IsNullOrEmpty(input))
        return input;

      var stringBuilder = new StringBuilder();
      for (int i = 0; i < input.Length; i++)
      {
        if (char.IsUpper(input[i]))
        {
          if (i > 0)
            stringBuilder.Append('_');
          stringBuilder.Append(char.ToLowerInvariant(input[i]));
        }
        else
        {
          stringBuilder.Append(input[i]);
        }
      }
      return stringBuilder.ToString();
    }

  }
}
