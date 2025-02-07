import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        return [];
      }

      return users;
    } catch (error) {
      throw new Error("No se pudieron obtener los usuarios");
    }
  }

  async create(payload: CreateUserDto): Promise<User> {
    try {
      const userToCreate = new User();
      userToCreate.firstName = payload.firstName;
      userToCreate.lastName = payload.lastName;
      userToCreate.email = payload.email;
      userToCreate.password = payload.password;
      userToCreate.lastLogin = payload.lastLogin;

      const userCreated = await this.userRepository.save(userToCreate);
      return userCreated;
    } catch (error) {
      console.log("Error creando usuario");
      throw new Error("No se pudo crear el usuario");
    }
  }
}
