import { Document } from 'mongoose';
import { UserDTO } from '../../DTOs/User.DTO';
import { TodoDTO } from '../../DTOs/Todo.DTO';

export class Mapper {
  public static UserEntity_UserDTO(value: Document): UserDTO {
    const userDTO = new UserDTO();

    userDTO.Id = value.id;
    userDTO.Username = value.get("Username");
    userDTO.CreationDate = value.get("CreationDate");

    return userDTO;
  }

  public static TodoEntity_TodoDTO(value: Document): TodoDTO {
    const todoDTO = new TodoDTO();

    todoDTO.Id = value.id;
    todoDTO.Title = value.get("Title");
    todoDTO.Description = value.get("Description");
    todoDTO.Status = value.get("Status");
    todoDTO.CreationDate = value.get("CreationDate");
    todoDTO.ExpirationDate = value.get("ExpirationDate");
    todoDTO.AssignedUserIds = value.get("AssignedUserIds") || [];

    return todoDTO;
  }
}
