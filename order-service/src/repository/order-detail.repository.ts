import { Repository } from "typeorm";
import { OrderDetail } from "../entity/order-detail.entity";

export class OrderDetailRepository extends Repository<OrderDetail> {
  constructor(repository: Repository<OrderDetail>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
