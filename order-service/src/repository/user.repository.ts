import { Repository } from "typeorm";
import { User } from "../entity/user.entity";

export class UserRepository extends Repository<User> {
  constructor(repository: Repository<User>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
