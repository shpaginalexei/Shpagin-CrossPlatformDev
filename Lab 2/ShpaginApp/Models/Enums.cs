using System.Text.Json.Serialization;
using Npgsql;

namespace ShpaginApp.Models
{
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum RussianAgeRatingEnum
  {
    ZERO,
    SIX,
    TWELVE,
    SIXTEEN,
    EIGHTEEN,
  }

  public static class AgeRatingMapper
  {
    public static readonly Dictionary<RussianAgeRatingEnum, string> Labels =
        new()
        {
            { RussianAgeRatingEnum.ZERO, "0+" },
            { RussianAgeRatingEnum.SIX, "6+" },
            { RussianAgeRatingEnum.TWELVE, "12+" },
            { RussianAgeRatingEnum.SIXTEEN, "16+" },
            { RussianAgeRatingEnum.EIGHTEEN, "18+" },
        };
  }

  public enum BookStatusEnum
  {
    WANT_TO_READ,
    READING,
    COMPLETED,
  }

  public class UpperCaseEnumTranslator : INpgsqlNameTranslator
  {
    public string TranslateMemberName(string clrName) => clrName.ToUpper();
    public string TranslateTypeName(string clrName) => clrName.ToUpper();
  }

  [Flags]
  public enum BookIncludeOptions { Details = 1, Tags = 2 }
}
