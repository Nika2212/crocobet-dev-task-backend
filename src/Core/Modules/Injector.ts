import { UserController } from '../../Controllers/User.Controller';
import { TodoController } from '../../Controllers/Todo.Controller';
import { UserService } from '../../Services/User.Service';
import { TodoService } from '../../Services/Todo.Service';
import { UserRepository } from '../../Repositories/User.Repository';
import { TodoRepository } from '../../Repositories/Todo.Repository';
import { AuthController } from '../../Controllers/Auth.Controller';
import { AuthService } from '../../Services/Auth.Service';
import { CommonService } from '../../Services/Common.Service';

// Repositories
export const UserRepositoryInjector = new UserRepository();
export const TodoRepositoryInjector = new TodoRepository();
// Services
export const AuthServiceInjector = new AuthService();
export const UserServiceInjector = new UserService();
export const CommonServiceInjector = new CommonService();
export const TodoServiceInjector = new TodoService();
// Controllers
export const AuthControllerInjector = new AuthController();
export const UserControllerInjector = new UserController();
export const TodoControllerInjector = new TodoController();
