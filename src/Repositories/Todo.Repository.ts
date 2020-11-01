import { Document } from 'mongoose';
import { CreateTodoDTO } from '../DTOs/CreateTodo.DTO';
import { TodoEntity } from '../Entities/Todo.Entity';
import { UpdateTodoDTO } from '../DTOs/UpdateTodo.DTO';

export class TodoRepository {
  public async Create(createTodoDTO: CreateTodoDTO): Promise<Document> {
    const newTodo = new TodoEntity({
      Title: createTodoDTO.Title,
      Description: createTodoDTO.Description,
      Status: createTodoDTO.Status,
      CreationDate: new Date().getTime(),
      ExpirationDate: createTodoDTO.ExpirationDate,
      AssignedUserIds: createTodoDTO.AssignedUserIds
    });

    return await newTodo.save();
  }

  public async Get(): Promise<Document[]> {
    const model = await TodoEntity.find();

    return model;
  }

  public async GetById(id: string): Promise<Document> {
    const model = await TodoEntity.findOne({_id: id});

    return model;
  }

  public async GetByUserId(id: string): Promise<Document[]> {
    const model = await TodoEntity.find({'AssignedUserIds' : id});

    return model;
  }

  public async Exists(id: string): Promise<boolean> {
    const model = await TodoEntity.exists({_id: id});

    return model;
  }

  public async Update(updateTodoDTO: UpdateTodoDTO): Promise<Document> {
    const model = await TodoEntity.findByIdAndUpdate(updateTodoDTO.Id, {
      Title: updateTodoDTO.Title,
      Description: updateTodoDTO.Description,
      Status: updateTodoDTO.Status,
      ExpirationDate: updateTodoDTO.ExpirationDate,
      AssignedUserIds: updateTodoDTO.AssignedUserIds
    });

    await model.save();

    const newModel = await TodoEntity.findById(updateTodoDTO.Id);

    return newModel;
  }

  public async Remove(id: string): Promise<Document> {
    const model = await TodoEntity.findByIdAndRemove(id);

    return model;
  }
}
