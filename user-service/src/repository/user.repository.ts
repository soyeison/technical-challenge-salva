import { Repository } from "typeorm";
import { User } from "../entity/user.entity";

export class UserRepository extends Repository<User> {
  constructor(repository: Repository<User>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = await this.findOneBy({ email });

    return user;
  }
}
