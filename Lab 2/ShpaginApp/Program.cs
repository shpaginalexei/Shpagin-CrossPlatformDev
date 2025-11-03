using System.Text.Json;
using System.Text.Json.Serialization;
using ShpaginApp.Data.Repositories;
using ShpaginApp.Data.Services;
using ShpaginApp.Exceptions;
using ShpaginApp.Extentions;
using ShpaginApp.Models.Validators;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabase(builder.Configuration);

var app = builder.Build();

// ----- Repositories ------ //
builder.Services.AddScoped<AuthorRepository>();
builder.Services.AddScoped<TagRepository>();
builder.Services.AddScoped<BookRepository>();
builder.Services.AddScoped<UserRepository>();

// ----- Services ------ //
builder.Services.AddScoped<AuthorService>();
builder.Services.AddScoped<TagService>();
builder.Services.AddScoped<BookService>();
builder.Services.AddScoped<UserService>();

// ----- Controllers ------ //
builder.Services
  .AddControllers(options => options.Filters.Add<ValidateModelAttribute>())
  .AddJsonOptions(options =>
    {
      options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower;
      options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    }
  );

// ----- ExceptionHandlers ------ //
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
builder.Services.AddExceptionHandler<AppExceptionHandler>();
builder.Services.AddExceptionHandler<DbExceptionHandler>();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

builder.Services.AddSwaggerGen();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseExceptionHandler();

app.UseAuthorization();

app.MapControllers();

app.Run();
