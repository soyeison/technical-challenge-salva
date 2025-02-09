import { Repository } from "typeorm";
import { Product } from "../entity/product.entity";

export class ProductRepository extends Repository<Product> {
  constructor(repository: Repository<Product>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
