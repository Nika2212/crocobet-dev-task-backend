import { Document } from "mongoose";
import { RegisterDTO } from '../DTOs/Register.DTO';
import { UserEntity } from '../Entities/User.Entity';
import { encrypt } from '../Core/Helpers/Crypt';

export class UserRepository {
  public async Create(createUserDTO: RegisterDTO): Promise<Document> {
    const newUserEntity = new UserEntity({
      Username: createUserDTO.Username,
      PasswordHash: encrypt(createUserDTO.Password),
      CreationDate: new Date().getTime()
    });

    return await newUserEntity.save();
  }

  public async Get(): Promise<Document[]> {
    const model = await UserEntity.find();

    return model;
  }

  public async GetById(id: string): Promise<Document> {
    const model = await UserEntity.findOne({_id: id});

    return model;
  }

  public async Exists(id: string): Promise<boolean> {
    const model = await UserEntity.exists({_id: id});

    return model;
  }

  public async GetByUsername(username: string): Promise<Document> {
    const model = await UserEntity.findOne({Username: username});

    return model;
  }
}
