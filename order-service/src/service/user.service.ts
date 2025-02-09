import { UserRepository } from "../repository/user.repository";
import { User } from "../entity/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(payload: CreateUserDto): Promise<User> {
    const userToCreate = new User();
    userToCreate.fullName = payload.fullName;
    userToCreate.userServiceId = payload.userServiceId;

    const userCreated = await this.userRepository.save(userToCreate);
    return userCreated;
  }
}
