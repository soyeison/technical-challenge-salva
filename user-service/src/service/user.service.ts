import { AppDataSource } from "../data-source";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entity/user.entity";
import { AppError } from "../error/error-status";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    const users = await this.userRepository.find();
    console.log(users);
    if (!users || !users.length) {
      return [];
    }

    return users;
  }

  async create(payload: CreateUserDto): Promise<User> {
    const userToCreate = new User();
    userToCreate.firstName = payload.firstName;
    userToCreate.lastName = payload.lastName;
    userToCreate.email = payload.email;
    userToCreate.password = payload.password;
    userToCreate.lastLogin = payload.lastLogin;

    const userCreated = await this.userRepository.save(userToCreate);
    return userCreated;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new AppError(`El usuario con email ${email} no existe`, 404);
    }
    return user;
  }

  async update(id: number, payload: any) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new AppError(`El usuario con id ${id} no existe`, 404);
    }

    return await this.userRepository.save({
      ...user,
      ...payload,
    });
  }

  async delete(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new AppError(`El usuario con id ${id} no existe`, 404);
    }

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();
  }
}
