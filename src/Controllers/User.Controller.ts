import { Request, Response } from 'express';
import { RegisterDTO } from '../DTOs/Register.DTO';
import { UserService } from '../Services/User.Service';
import { UserServiceInjector } from '../Core/Modules/Injector';
import { AuthorizeUserDTO } from '../DTOs/AuthorizeUser.DTO';
import { generateToken } from '../Core/Helpers/JWT';

export class UserController {
  private _userService: UserService;

  constructor() {
    this.SetupDefaults();
  }

  private SetupDefaults(): void {
    this.ImplementMembers();
  }

  private ImplementMembers(): void {
    this._userService = UserServiceInjector;
  }

  public async Get(req: Request, res: Response): Promise<void> {
    const model = await this._userService.Get();

    res.json(model);
  }
}
