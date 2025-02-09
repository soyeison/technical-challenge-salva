import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from "typeorm";
import { Order } from "./order.entity";

const numericTransformer: ValueTransformer = {
  to: (value: number) => value, // Guarda como número
  from: (value: string) => parseFloat(value), // Convierte de string a número
};

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column()
  productName: string;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  productPrice: number;

  @Column()
  quantity: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  lineTotalPrice: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;
}
