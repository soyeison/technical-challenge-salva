import { AppDataSource } from "../data-source";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../entity/product.entity";
import { AppError } from "../error/error-status";
import { ProductRepository } from "../repository/product.repository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async getAll(limit: number = 5, page: number = 1): Promise<Product[]> {
    const offset = (page - 1) * limit;
    const products = await this.productRepository.find({
      order: { createdAt: "DESC" },
      skip: offset,
      take: limit,
    });

    if (!products || !products.length) {
      return [];
    }

    return products;
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const productToCreate = new Product();
    productToCreate.name = payload.name;
    productToCreate.description = payload.description;
    productToCreate.price = payload.price;
    productToCreate.stock = payload.stock;

    const productCreated = await this.productRepository.save(productToCreate);
    return productCreated;
  }

  async getById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError(`El product con id ${id} no existe`, 404);
    }
    return product;
  }

  async update(id: number, payload: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError(`El producto con id ${id} no existe`, 404);
    }

    const productUpdated: Product = await this.productRepository.save({
      ...product,
      ...payload,
    });

    return productUpdated;
  }

  async delete(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new AppError(`El producto con id ${id} no existe`, 404);
    }

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id })
      .execute();
  }

  async unitsToRemove(id: number, unitsToRemove: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new AppError(`El producto con id ${id} no existe`, 404);
    }

    const unitsResult = product.stock - unitsToRemove;

    if (unitsResult < 0) {
      throw new AppError("No hay suficientes unidades en stock", 400);
    }

    await this.productRepository.update(id, {
      stock: unitsResult,
    });

    product.stock = unitsResult;

    return product;
  }
}
