import "dotenv/config";
import { DataSource } from "typeorm";
import { Product } from "./entity/product.entity";

// TODO: Agregar estoa datos al .env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [Product],
  subscribers: [],
  migrations: [],
});
