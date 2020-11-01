import { TodoService } from '../Services/Todo.Service';
import { TodoServiceInjector } from '../Core/Modules/Injector';
import { Request, Response } from 'express';
import { CreateTodoDTO } from '../DTOs/CreateTodo.DTO';
import { UpdateTodoDTO } from '../DTOs/UpdateTodo.DTO';

export class TodoController {
  private _todoService: TodoService;

  constructor() {
    this.SetupDefaults();
  }

  private SetupDefaults(): void {
    this.ImplementMembers();
  }

  private ImplementMembers(): void {
    this._todoService = TodoServiceInjector;
  }

  public async Get(req: Request, res: Response): Promise<void> {
    const model = await this._todoService.Get();

    res.json(model);
  }

  public async GetCurrentUserBased(req: Request, res: Response): Promise<void> {
    const userId: string = req.id;
    const model = await this._todoService.GetByUserId(userId);

    res.json(model);
  }

  public async GetUserBased(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;
    const model = await this._todoService.GetByUserId(userId);

    res.json(model);
  }

  public async Create(req: Request, res: Response): Promise<void> {
    const createTodoDTO = req.body as CreateTodoDTO;

    const model = await this._todoService.Create(createTodoDTO);

    res.json(model);
  }

  public async Update(req: Request, res: Response): Promise<void> {
    const updateTodoDTO = req.body as UpdateTodoDTO;
    const model = await this._todoService.Update(updateTodoDTO);

    res.json(model);
  }

  public async Remove(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const model = await this._todoService.Remove(id);

    res.json(model);
  }
}
