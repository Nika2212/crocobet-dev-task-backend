import { BaseResponse } from '../Core/Models/BaseResponse.Model';
import { UserDTO } from '../DTOs/User.DTO';
import { UserRepository } from '../Repositories/User.Repository';
import { UserRepositoryInjector } from '../Core/Modules/Injector';
import { Mapper } from '../Core/Modules/Mapper';

export class UserService {
  private _userRepository: UserRepository;

  constructor() {
    this.SetupDefaults();
  }

  private ImplementMembers(): void {
    this._userRepository = UserRepositoryInjector;
  }

  private SetupDefaults(): void {
    this.ImplementMembers();
  }

  public async Get(): Promise<BaseResponse<UserDTO[]>> {
    const userEntities = await this._userRepository.Get();
    const userDTOs: UserDTO[] = [];

    userEntities.map(u => userDTOs.push(Mapper.UserEntity_UserDTO(u)));

    return BaseResponse.GetSuccessResponse(userDTOs);
  }
}
