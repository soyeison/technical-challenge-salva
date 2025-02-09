import axios from "axios";
import { AppDataSource } from "../data-source";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserTypeWithoutPassword } from "../dto/user-without-password.dto";
import { User } from "../entity/user.entity";
import { AppError } from "../error/error-status";
import { UserRepository } from "../repository/user.repository";

const APP_ORDER_SERVICE = "http://order-service:3006";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAll(
    limit: number = 5,
    page: number = 1
  ): Promise<UserTypeWithoutPassword[]> {
    const offset = (page - 1) * limit;
    const users = await this.userRepository.find({
      order: { createdAt: "DESC" },
      skip: offset,
      take: limit,
    });

    if (!users || !users.length) {
      return [];
    }

    const userResp: UserTypeWithoutPassword[] = users.map((user) => {
      const { password, ...rest } = user;
      const userTransformed: UserTypeWithoutPassword = {
        ...rest,
      };
      return userTransformed;
    });

    return userResp;
  }

  private async createUserOrderService(fullName: string, id: number) {
    try {
      const resp = await axios.post(
        `${APP_ORDER_SERVICE}/users`,
        { fullName, userServiceId: id },
        {
          validateStatus: (status: number) => status < 500,
        }
      );

      return resp;
    } catch (error) {
      console.log("Error inesperado", error);
      throw new AppError("Error inesperado", 500);
    }
  }

  async create(payload: CreateUserDto): Promise<UserTypeWithoutPassword> {
    const userToCreate = new User();
    userToCreate.firstName = payload.firstName;
    userToCreate.lastName = payload.lastName;
    userToCreate.email = payload.email;
    userToCreate.password = payload.password;

    const userCreated = await this.userRepository.save(userToCreate);
    const { password, ...rest } = userCreated;

    // Crear usuario en el microservicio de ordenes
    await this.createUserOrderService(
      `${payload.firstName} ${payload.lastName}`,
      userCreated.id
    );
    return rest;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new AppError(`El usuario con email ${email} no existe`, 404);
    }
    return user;
  }

  async update(
    id: number,
    payload: UpdateUserDto
  ): Promise<UserTypeWithoutPassword> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new AppError(`El usuario con id ${id} no existe`, 404);
    }

    const userUpdated: User = await this.userRepository.save({
      ...user,
      ...payload,
    });

    const { password, ...rest } = userUpdated;

    return rest;
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
