import { TodoRepository } from '../Repositories/Todo.Repository';
import { CommonServiceInjector, TodoRepositoryInjector } from '../Core/Modules/Injector';
import { BaseResponse } from '../Core/Models/BaseResponse.Model';
import { TodoDTO } from '../DTOs/Todo.DTO';
import { Mapper } from '../Core/Modules/Mapper';
import { CreateTodoDTO } from '../DTOs/CreateTodo.DTO';
import { validateCreateTodoDTO, validateUpdateTodoDTO } from '../Core/Helpers/Validators';
import { ErrorCodes } from '../Core/Enums/ErrorCodes';
import { Logger } from '../Core/Modules/Logger';
import { UpdateTodoDTO } from '../DTOs/UpdateTodo.DTO';
import { CommonService } from './Common.Service';

export class TodoService {
  private _todoRepository: TodoRepository;
  private _commonService: CommonService;

  constructor() {
    this.SetupDefaults();
  }

  private SetupDefaults(): void {
    this.ImplementMembers();
  }

  private ImplementMembers(): void {
    this._todoRepository = TodoRepositoryInjector;
    this._commonService = CommonServiceInjector;
  }

  private async validateAssignedUserIdList(assignedUserIds: string[]): Promise<boolean> {
    if (Array.isArray(assignedUserIds)) {
      for (const id of assignedUserIds) {
        if (!await this._commonService.UserExists(id)) {
          return false;
        }
      }

      return true;
    } else {
      return true;
    }
  }

  public async Get(): Promise<BaseResponse<TodoDTO[]>> {
    const todoEntities = await this._todoRepository.Get();
    const todoDTOs: TodoDTO[] = [];

    todoEntities.map(u => todoDTOs.push(Mapper.TodoEntity_TodoDTO(u)));

    return BaseResponse.GetSuccessResponse(todoDTOs);
  }

  public async GetById(id: string): Promise<BaseResponse<TodoDTO>> {
    if (!id || id.length === 0) {
      return BaseResponse.GetErrorResponse(ErrorCodes.USER_NOT_FOUND);
    }

    const model = await this._todoRepository.GetById(id);
    const todoDTO = Mapper.TodoEntity_TodoDTO(model);

    return BaseResponse.GetSuccessResponse(todoDTO);
  }

  public async GetByUserId(id: string): Promise<BaseResponse<TodoDTO[]>> {
    if (!id || id.length === 0) {
      return BaseResponse.GetErrorResponse(ErrorCodes.USER_NOT_FOUND);
    }

    const model = await this._todoRepository.GetByUserId(id);
    const todoDTOs = [];

    if (!model || model.length === 0) {
      return BaseResponse.GetSuccessResponse([]);
    } else {
      for (const todo of model) {
        todoDTOs.push(Mapper.TodoEntity_TodoDTO(todo));
      }
    }

    return BaseResponse.GetSuccessResponse(todoDTOs);
  }

  public async Create(createTodoDTO: CreateTodoDTO): Promise<BaseResponse<TodoDTO>> {
    if (!createTodoDTO || validateCreateTodoDTO.validate(createTodoDTO).error) {
      Logger.Error(validateCreateTodoDTO.validate(createTodoDTO).error.message, "TODO SERVICE");
      return BaseResponse.GetErrorResponse(ErrorCodes.INVALID_CREATION_TODO_DTO);
    }

    let todoEntity;

    try {
      todoEntity = await this._todoRepository.Create(createTodoDTO);
    } catch (e) {
      Logger.Error(e, "TODO SERVICE");
      return BaseResponse.GetErrorResponse(ErrorCodes.SERVER_ERROR);
    }

    const assignedUserIds = todoEntity.get("AssignedUserIds") as string[];

    if (!await this.validateAssignedUserIdList(assignedUserIds)) {
      Logger.Error("Assigned User Id Doesn't Exists", "TODO SERVICE");
      return BaseResponse.GetErrorResponse(ErrorCodes.INVALID_ASSIGNED_USER_ID);
    }

    const todoDTO = Mapper.TodoEntity_TodoDTO(todoEntity);

    Logger.Info(`Todo: ${todoDTO.Title} - Created`, "TODO SERVICE");

    return BaseResponse.GetSuccessResponse(todoDTO);
  }

  public async Update(updateTodoDTO: UpdateTodoDTO): Promise<BaseResponse<TodoDTO>> {
    if (!updateTodoDTO || validateUpdateTodoDTO.validate(updateTodoDTO).error) {
      Logger.Error(validateCreateTodoDTO.validate(updateTodoDTO).error.message, "TODO SERVICE");
      return BaseResponse.GetErrorResponse(ErrorCodes.INVALID_UPDATE_TODO_DTO);
    }

    if (!await this._todoRepository.Exists(updateTodoDTO.Id)) {
      return BaseResponse.GetErrorResponse(ErrorCodes.TODO_NOT_FOUND);
    }

    let todoEntity;

    try {
      todoEntity = await this._todoRepository.Update(updateTodoDTO);
    } catch (e) {
      Logger.Error(e, "TODO SERVICE");
      return BaseResponse.GetErrorResponse(ErrorCodes.SERVER_ERROR);
    }

    const assignedUserIds = todoEntity.get("AssignedUserIds") as string[];

    if (!await this.validateAssignedUserIdList(assignedUserIds)) {
      Logger.Error("Assigned User Id Doesn't Exists", "TODO SERVICE");
      return BaseResponse.GetErrorResponse(ErrorCodes.INVALID_ASSIGNED_USER_ID);
    }

    const todoDTO = Mapper.TodoEntity_TodoDTO(todoEntity);

    Logger.Info(`Todo: ${todoDTO.Title} - Updated`, "TODO SERVICE");

    return BaseResponse.GetSuccessResponse(todoDTO);
  }

  public async Remove(id: string): Promise<BaseResponse<void>> {
    if (!id || !id.length) {
      Logger.Error("Invalid id", "TODO SERVICE")
      return BaseResponse.GetErrorResponse(ErrorCodes.INVALID_REMOVE_TODO_DTO);
    } else if (!await this._todoRepository.Exists(id)) {
      Logger.Error("Todo not found", "TODO SERVICE")
      return BaseResponse.GetErrorResponse(ErrorCodes.TODO_NOT_FOUND);
    }

    try {
      const model = await this._todoRepository.Remove(id);
      Logger.Info(`Todo: ${model.get("Title")} - Removed`, "TODO SERVICE");
    } catch (e) {
      Logger.Error(e, "TODO SERVICE");
      return BaseResponse.GetErrorResponse(ErrorCodes.SERVER_ERROR);
    }


    return BaseResponse.GetSuccessResponse();
  }
}
