import { Repository } from "typeorm";
import { Order } from "../entity/order.entity";

export class OrderRepository extends Repository<Order> {
  constructor(repository: Repository<Order>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
