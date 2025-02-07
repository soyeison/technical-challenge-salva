import { UserRepository } from "../repository/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    try {
      const users = await this.userRepository.getAll();
      if (!users) {
        return [];
      }

      return users;
    } catch (error) {
      throw new Error("No se pudieron obtener los usuarios");
    }
  }
}
