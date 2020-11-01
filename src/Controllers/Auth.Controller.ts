import { AuthServiceInjector } from '../Core/Modules/Injector';
import { Request, Response } from 'express';
import { RegisterDTO } from '../DTOs/Register.DTO';
import { AuthorizeUserDTO } from '../DTOs/AuthorizeUser.DTO';
import { AuthService } from '../Services/Auth.Service';

export class AuthController {
  private _authService: AuthService;

  constructor() {
    this.SetupDefaults();
  }

  private SetupDefaults(): void {
    this.ImplementMembers();
  }

  private ImplementMembers(): void {
    this._authService = AuthServiceInjector;
  }

  public async Register(req: Request, res: Response): Promise<void> {
    const createUserDTO = req.body as RegisterDTO;
    const model = await this._authService.Register(createUserDTO);

    res.json(model);
  }

  public async Authorize(req: Request, res: Response): Promise<void> {
    const authorizeUserDTO = req.body as AuthorizeUserDTO;
    const model = await this._authService.Authorize(authorizeUserDTO);

    res.json(model);
  }

  public async CheckUsername(req: Request, res: Response): Promise<void> {
    const username = req.body.Username as string;
    const model = await this._authService.CheckUsername(username);

    res.json(model);
  }

  public async Ping(req: Request, res: Response): Promise<void> {
    const id = req.id;
    const model = await this._authService.Ping(id);

    res.json(model);
  }
}
