import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from "typeorm";

const numericTransformer: ValueTransformer = {
  to: (value: number) => value, // Guarda como número
  from: (value: string) => parseFloat(value), // Convierte de string a número
};

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "text",
  })
  description: string;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  price: number;

  @Column({
    type: "int",
  })
  stock: number;

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
}
