import { UserRepository } from '../Repositories/User.Repository';
import { UserRepositoryInjector } from '../Core/Modules/Injector';
import { RegisterDTO } from '../DTOs/Register.DTO';
import { BaseResponse } from '../Core/Models/BaseResponse.Model';
import { UserDTO } from '../DTOs/User.DTO';
import { validateAuthorizeUserDTO, validateCreateUserDTO } from '../Core/Helpers/Validators';
import { ErrorCodes } from '../Core/Enums/ErrorCodes';
import { Mapper } from '../Core/Modules/Mapper';
import { AuthorizeUserDTO } from '../DTOs/AuthorizeUser.DTO';
import { decrypt } from '../Core/Helpers/Crypt';
import { Logger } from '../Core/Modules/Logger';
import { AuthorizedUserDTO } from '../DTOs/AuthorizedUser.DTO';
import { generateToken } from '../Core/Helpers/JWT';

export class AuthService {
  private _userRepository: UserRepository;

  private ImplementMembers(): void {
    this._userRepository = UserRepositoryInjector;
  }

  private SetupDefaults(): void {
    this.ImplementMembers();
  }

  constructor() {
    this.SetupDefaults();
  }

  public async Register(createUserDTO: RegisterDTO): Promise<BaseResponse<AuthorizedUserDTO>> {
    if (!createUserDTO || validateCreateUserDTO.validate(createUserDTO).error) {
      return BaseResponse.GetErrorResponse(ErrorCodes.INVALID_REGISTRATION_CREDENTIALS);
    }

    const userExists = await this._userRepository.GetByUsername(createUserDTO.Username) !== null;

    if (userExists) {
      return BaseResponse.GetErrorResponse(ErrorCodes.USERNAME_ALREADY_EXISTS);
    }

    let userEntity;

    try {
      userEntity = await this._userRepository.Create(createUserDTO);
    } catch (e) {
      return BaseResponse.GetErrorResponse(ErrorCodes.SERVER_ERROR);
    }

    const userDTO = Mapper.UserEntity_UserDTO(userEntity);
    const authorizedUserDTO = new AuthorizedUserDTO();

    authorizedUserDTO.User = userDTO;
    authorizedUserDTO.AccessToken = generateToken(userDTO.Id, userDTO.Username);

    Logger.Info(`User: ${userDTO.Username} - Created`, "AUTH SERVICE");

    return BaseResponse.GetSuccessResponse(authorizedUserDTO);
  }

  public async Authorize(authorizeUserDTO: AuthorizeUserDTO): Promise<BaseResponse<AuthorizedUserDTO>> {
    if (!authorizeUserDTO || validateAuthorizeUserDTO.validate(authorizeUserDTO).error) {
      return BaseResponse.GetErrorResponse(ErrorCodes.INVALID_AUTHORIZATION_CREDENTIALS);
    }

    const userEntity = await this._userRepository.GetByUsername(authorizeUserDTO.Username);

    if (userEntity === null) {
      return BaseResponse.GetErrorResponse(ErrorCodes.USER_NOT_FOUND);
    }

    const passwordValidation = decrypt(authorizeUserDTO.Password, userEntity.get("PasswordHash"));

    if (!passwordValidation) {
      return BaseResponse.GetErrorResponse(ErrorCodes.INVALID_PASSWORD);
    }

    const userDTO = Mapper.UserEntity_UserDTO(userEntity);
    const authorizedUserDTO = new AuthorizedUserDTO();

    authorizedUserDTO.User = userDTO;
    authorizedUserDTO.AccessToken = generateToken(userDTO.Id, userDTO.Username);

    Logger.Info(`User: ${userDTO.Username} - Authorized`, "AUTH SERVICE");

    return BaseResponse.GetSuccessResponse(authorizedUserDTO);
  }
}
