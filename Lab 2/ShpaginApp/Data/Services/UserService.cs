using ShpaginApp.Models.DTOs;
using ShpaginApp.Exceptions;
using ShpaginApp.Data.Repositories;
using ShpaginApp.Models.Mapping;

namespace ShpaginApp.Data.Services
{
  public class UserService(UserRepository userRepo, BookRepository bookRepo)
  {
    private readonly UserRepository _userRepo = userRepo;
    private readonly BookRepository _bookRepo = bookRepo;

    public async Task<IEnumerable<UserItemResponse>> GetAll()
    {
      var users = await _userRepo.GetAllAsync();
      return users.Select(UserMapper.MapItem).OrderBy(u => u.UserName);
    }

    public async Task<UserResponse> GetOne(Guid userId)
    {
      var user = await _userRepo.GetByIdAsync(userId)
        ?? throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      return UserMapper.Map(user);
    }

    public async Task<UserEntity> GetEntityByUserName(string userName)
    {
      var user = await _userRepo.GetByUserNameAsync(userName);
      return user is null
        ? throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with username << {userName} >> not found",
          new NotFoundByNameDetails(NotFoundTarget.user, userName)
        )
        : UserMapper.MapToEntity(user);
    }

    public async Task<UserResponse> Create(CreateUserCommand command)
    {
      if (await _userRepo.ExistNameAsync(command.UserName))
        throw new AppException(
          StatusCodes.Status400BadRequest,
          ErrorCodeEnum.VALIDATION_ERROR,
          $"User with username << {command.UserName} >> already exist",
          new ValidationErrorDetails(ValidationErrorField.user_name, "Пользователь с таким именем уже существует")
        );

      if (await _userRepo.ExistEmailAsync(command.Email))
        throw new AppException(
          StatusCodes.Status400BadRequest,
          ErrorCodeEnum.VALIDATION_ERROR,
          $"User with email << {command.Email} >> already exist",
          new ValidationErrorDetails(ValidationErrorField.email, "Пользователь с таким email уже существует")
        );
      var user = await _userRepo.CreateAsync(UserMapper.Map(command));
      return UserMapper.Map(user);
    }

    public async Task<UserResponse> UpdatePut(Guid userId, UpdateUserPutRequest request)
    {
      var user = await _userRepo.GetByIdAsync(userId)
        ?? throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      user.ApplyUpdate(request);
      user = await _userRepo.UpdateAsync(user);
      return UserMapper.Map(user);
    }

    public async Task<UserResponse> UpdatePatch(Guid userId, UpdateUserPatchRequest request)
    {
      var user = await _userRepo.GetByIdAsync(userId)
        ?? throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      user.ApplyUpdate(request);
      user = await _userRepo.UpdateAsync(user);
      return UserMapper.Map(user);
    }

    public async Task Delete(Guid userId)
    {
      if (!await _userRepo.ExistAsync(userId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      await _userRepo.DeleteAsync(userId);
    }


    // ----- Books ------ //
    public async Task<IEnumerable<UserBookResponse>> GetBooks(Guid userId)
    {
      var user = await _userRepo.GetByIdAsync(userId)
        ?? throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      return user.UserBooks.Select(UserBookMapper.Map).OrderByDescending(b => b.AddedAt).ThenBy(b => b.Name);
    }

    public async Task<UserBookResponse> GetBook(Guid userId, Guid bookId)
    {
      if (!await _userRepo.ExistAsync(userId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      if (!await _bookRepo.ExistAsync(bookId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"Book with id << {bookId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.book, bookId)
        );

      var userBook = await _userRepo.GetUserBookAsync(userId, bookId)
        ?? throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.VALIDATION_ERROR,
          $"Relation `User with id << {userId} >> and Book with id << {bookId} >>` not found",
          new NotFoundUserBookRelationDetails(NotFoundTarget.user_book, userId, bookId)
        );

      return UserBookMapper.Map(userBook);
    }

    public async Task<UserBookResponse> AddBook(Guid userId, AddUserBookRequest request)
    {
      if (!await _userRepo.ExistAsync(userId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      if (!await _bookRepo.ExistAsync(request.BookId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"Book with id << {request.BookId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.book, request.BookId)
        );

      if (await _userRepo.ExistUserBookAsync(userId, request.BookId))
        throw new AppException(
          StatusCodes.Status400BadRequest,
          ErrorCodeEnum.VALIDATION_ERROR,
          $"Relation `User with id << {userId} >> and Book with id << {request.BookId} >>` already exist",
          new NotFoundUserBookRelationDetails(NotFoundTarget.user_book, userId, request.BookId)
        );

      var userBook = await _userRepo.AddBookAsync(userId, request);
      return UserBookMapper.Map(userBook);
    }

    public async Task<UserBookResponse> UpdateBook(Guid userId, Guid bookId, UpdateUserBookPutRequest request)
    {
      if (!await _userRepo.ExistAsync(userId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      if (!await _bookRepo.ExistAsync(bookId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"Book with id << {bookId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.book, bookId)
        );

      var userBook = await _userRepo.GetUserBookAsync(userId, bookId)
        ?? throw new AppException(
          StatusCodes.Status400BadRequest,
          ErrorCodeEnum.VALIDATION_ERROR,
          $"Relation `User with id << {userId} >> and Book with id << {bookId} >>` not found",
          new NotFoundUserBookRelationDetails(NotFoundTarget.user_book, userId, bookId)
        );

      userBook.ApplyUpdate(request);
      userBook = await _userRepo.UpdateBookAsync(userBook);
      return UserBookMapper.Map(userBook);
    }

    public async Task<UserBookResponse> UpdateBook(Guid userId, Guid bookId, UpdateUserBookPatchRequest request)
    {
      if (!await _userRepo.ExistAsync(userId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      if (!await _bookRepo.ExistAsync(bookId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"Book with id << {bookId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.book, bookId)
        );

      var userBook = await _userRepo.GetUserBookAsync(userId, bookId)
        ?? throw new AppException(
          StatusCodes.Status400BadRequest,
          ErrorCodeEnum.VALIDATION_ERROR,
          $"Relation `User with id << {userId} >> and Book with id << {bookId} >>` not found",
          new NotFoundUserBookRelationDetails(NotFoundTarget.user_book, userId, bookId)
        );
      userBook.ApplyUpdate(request);
      userBook = await _userRepo.UpdateBookAsync(userBook);
      return UserBookMapper.Map(userBook);
    }

    public async Task<bool> DeleteBook(Guid userId, Guid bookId)
    {
      if (!await _userRepo.ExistAsync(userId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"User with id << {userId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.user, userId)
        );

      if (!await _bookRepo.ExistAsync(bookId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"Book with id << {bookId} >> not found",
          new NotFoundByIdDetails(NotFoundTarget.book, bookId)
        );

      if (!await _userRepo.ExistUserBookAsync(userId, bookId))
        throw new AppException(
          StatusCodes.Status404NotFound,
          ErrorCodeEnum.NOT_FOUND,
          $"Relation `User with id << {userId} >> and Book with id << {bookId} >>` not found",
          new NotFoundUserBookRelationDetails(NotFoundTarget.user_book, userId, bookId)
        );
      return await _userRepo.DeleteBookAsync(userId, bookId);
    }
  }
}
