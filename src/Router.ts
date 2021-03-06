import express, { Request, Response } from 'express';
import { UserController } from './Controllers/User.Controller';
import { TodoController } from './Controllers/Todo.Controller';
import { AuthControllerInjector, TodoControllerInjector, UserControllerInjector } from './Core/Modules/Injector';
import { authenticate } from './Middlewares/Authenticate.Middleware';
import { AuthController } from './Controllers/Auth.Controller';

export class Router {
  private _authController: AuthController;
  private _usersController: UserController;
  private _todosController: TodoController;

  constructor(
    private readonly _express: express.Application
  ) {
    this.SetupDefaults();
  }

  private ImplementMembers(): void {
    this._authController = AuthControllerInjector;
    this._usersController = UserControllerInjector;
    this._todosController = TodoControllerInjector;
  }

  private SetupDefaults(): void {
    this.ImplementMembers();
  }

  public Route(): void {
    this._express.route('/Auth/Register')
      .post((req: Request, res: Response) => this._authController.Register(req, res));
    this._express.route('/Auth/Authorize')
      .post((req: Request, res: Response) => this._authController.Authorize(req, res));
    this._express.route('/Auth/CheckUsername')
      .post((req: Request, res: Response) => this._authController.CheckUsername(req, res));
    this._express.route('/Auth/Ping')
      .get(authenticate, (req: Request, res: Response) => this._authController.Ping(req, res));

    this._express.route('/Users/Get')
      .get(authenticate, (req: Request, res: Response) => this._usersController.Get(req, res));

    this._express.route('/Todos/Get')
      .get(authenticate, (req: Request, res: Response) => this._todosController.Get(req, res));
    this._express.route('/Todos/GetCurrentUserBased')
      .get(authenticate, (req: Request, res: Response) => this._todosController.GetCurrentUserBased(req, res));
    this._express.route('/Todos/GetUserBased/:id')
      .get(authenticate, (req: Request, res: Response) => this._todosController.GetUserBased(req, res));
    this._express.route('/Todos/Create')
      .post(authenticate, (req: Request, res: Response) => this._todosController.Create(req, res));
    this._express.route('/Todos/Update')
      .put(authenticate, (req: Request, res: Response) => this._todosController.Update(req, res));
    this._express.route('/Todos/Remove/:id')
      .delete(authenticate, (req: Request, res: Response) => this._todosController.Remove(req, res));
  }
}
