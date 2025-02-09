import axios from "axios";
import { AppDataSource } from "../data-source";
import {
  CreateOrderDto,
  CreateOrderProductsDto,
} from "../dto/create-order.dto";
import { OrderDetail } from "../entity/order-detail.entity";
import { Order } from "../entity/order.entity";
import { AppError } from "../error/error-status";
import { OrderRepository } from "../repository/order.repository";
import { ProductService } from "../dto/product-service-entity.dto";
import { UserRepository } from "../repository/user.repository";

const APP_PRODUCT_SERVICE = "http://product-service:3008";

export class OrderService {
  private userRepository: UserRepository;
  private orderRepository: OrderRepository;

  constructor(
    orderRepository: OrderRepository,
    userRepository: UserRepository
  ) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
  }

  async getAll(limit: number = 5, page: number = 1): Promise<Order[]> {
    const offset = (page - 1) * limit;
    const orders = await this.orderRepository.find({
      order: { orderDate: "DESC" },
      skip: offset,
      take: limit,
      relations: ["orderDetails", "user"],
    });

    if (!orders || !orders.length) {
      return [];
    }

    return orders;
  }

  async getById(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new AppError(`La orden con id ${id} no existe`, 404);
    }
    return order;
  }

  calculateOrderTotal(details: OrderDetail[]) {
    return details.reduce(
      (sum, detail) => sum + detail.productPrice * detail.quantity,
      0
    );
  }

  async createOrderDetail(
    order: Order,
    products: CreateOrderProductsDto[]
  ): Promise<OrderDetail[]> {
    const resp: OrderDetail[] = [];
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      // Consultar el producto al microservicio de productos
      const productFetched = await axios.get(
        `${APP_PRODUCT_SERVICE}/products/${product.productId}`,
        {
          validateStatus: (status) => status < 500,
        }
      );

      if (productFetched.status === 404) {
        throw new AppError(
          `El producto con id ${product.productId} no existe`,
          400
        );
      }

      const productData: ProductService = productFetched.data.data;

      const detail = new OrderDetail();
      detail.orderId = order.id;
      detail.productId = product.productId;
      detail.productName = productData.name;
      detail.productPrice = productData.price;
      detail.quantity = product.quantity;
      detail.lineTotalPrice = productData.price * product.quantity;
      detail.order = order;

      resp.push(detail);
    }

    return resp;
  }

  async create(payload: CreateOrderDto): Promise<Order> {
    // Iniciar una transacción
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Consultar el id del usuario
      const user = await this.userRepository.findOne({
        where: { userServiceId: payload.userId },
      });

      if (!user) {
        throw new AppError(
          `El usuario con id ${payload.userId} no existe`,
          404
        );
      }
      // Construir el detalle de la orden
      const orderToCreate = new Order();
      orderToCreate.userId = user.id;
      orderToCreate.totalPrice = 0;
      orderToCreate.orderDate = new Date();

      await queryRunner.manager.save(orderToCreate);

      const orderDetailCreated = await this.createOrderDetail(
        orderToCreate,
        payload.products
      );

      await queryRunner.manager.save(orderDetailCreated);

      // Actualizar el precio total
      const totalPrice = this.calculateOrderTotal(orderDetailCreated);
      await queryRunner.manager.update(Order, orderToCreate.id, { totalPrice });

      // Confirmar la transacción
      await queryRunner.commitTransaction();
      await queryRunner.release();

      // Consultar la orden para obtener los detalles
      const orderToResponse = await this.orderRepository.findOne({
        where: {
          id: orderToCreate.id,
        },
        relations: ["orderDetails", "user"],
      });
      return orderToResponse!;
    } catch (error) {
      // Revertir la transacción si hay error
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      if (error instanceof AppError) {
        throw error;
      }

      console.log("Error inesperado", error);
      throw new AppError("Error inesperado", 500);
    }
  }

  async delete(id: number) {
    // Iniciar una transacción
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) {
        throw new AppError(`La orden con id ${id} no existe`, 404);
      }

      await AppDataSource.createQueryBuilder()
        .delete()
        .from(OrderDetail)
        .where("orderId = :orderId", { orderId: id })
        .execute();

      await AppDataSource.createQueryBuilder()
        .delete()
        .from(Order)
        .where("id = :id", { id })
        .execute();

      // Confirmar transaccion
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      // Revertir la transacción si hay error
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      if (error instanceof AppError) {
        throw error;
      }

      console.log("Error inesperado", error);
      throw new AppError("Error inesperado", 500);
    }
  }
}
