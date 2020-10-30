import { UserRepository } from '../Repositories/User.Repository';
import { UserRepositoryInjector } from '../Core/Modules/Injector';

export class CommonService {
  private _userRepository: UserRepository;

  constructor() {
    this.SetupDefaults();
  }

  private SetupDefaults(): void {
    this.ImplementMembers();
  }

  private ImplementMembers(): void {
    this._userRepository = UserRepositoryInjector;
  }

  public async UserExists(id: string): Promise<boolean> {
    const model = await this._userRepository.Exists(id);

    return model;
  }
}
