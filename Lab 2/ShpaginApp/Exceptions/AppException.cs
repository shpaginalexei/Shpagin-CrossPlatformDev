using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Diagnostics;

namespace ShpaginApp.Exceptions
{
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum ErrorCodeEnum
  {
    UNAUTHORIZED,
    NOT_FOUND,
    VALIDATION_ERROR,
    DATABASE_ERROR,
    INTERNAL_SERVER_ERROR
  }

  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum NotFoundTarget
  {
    author,
    tag,
    book,
    user,
    user_book
  }

  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum ValidationErrorField
  {
    user_name,
    email,
    author_ids,
    tag_ids
  }


  public interface IErrorDetails { }

  public record NotFoundByIdDetails(NotFoundTarget Target, Guid Id) : IErrorDetails;
  public record NotFoundByNameDetails(NotFoundTarget Target, string Name) : IErrorDetails;
  public record NotFoundUserBookRelationDetails(NotFoundTarget Target, Guid UserId, Guid BookId) : IErrorDetails;
  public class ValidationErrorDetails : IErrorDetails
  {
    public string Field { get; set; }
    public string Message { get; set; }

    public ValidationErrorDetails(string field, string message)
    {
      Field = field;
      Message = message;
    }

    public ValidationErrorDetails(ValidationErrorField field, string message)
    {
      Field = field.ToString();
      Message = message;
    }
  }

  public class AppException(
    int statusCode,
    ErrorCodeEnum error,
    string message,
    IErrorDetails? details = null) : Exception(message)
  {
    public int StatusCode { get; } = statusCode;
    public ErrorCodeEnum ErrorCode { get; } = error;
    public IErrorDetails? Details { get; } = details;
    public AppError ToAppError()
    {
      return new AppError
      {
        Status = StatusCode,
        ErrorCode = ErrorCode,
        Message = Message,
        Details = Details
      };
    }
  }

  public class AppError
  {
    [JsonPropertyOrder(-4)]
    [JsonPropertyName("status")]
    public int? Status { get; set; }

    [JsonPropertyOrder(-3)]
    [JsonPropertyName("error")]
    public ErrorCodeEnum? ErrorCode { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyOrder(-2)]
    [JsonPropertyName("message")]
    public string? Message { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyOrder(-1)]
    [JsonPropertyName("details")]
    public object? Details { get; set; }
  }

  public sealed class AppExceptionHandler : IExceptionHandler
  {
    public async ValueTask<bool> TryHandleAsync(
      HttpContext httpContext,
      Exception exception,
      CancellationToken cancellationToken)
    {
      if (exception is not AppException appException)
      {
        return false;
      }
      await HandleException.HandleAsync(httpContext, appException.ToAppError());
      return true;
    }
  }
}

