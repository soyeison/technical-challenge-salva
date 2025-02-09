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
  username: "postgres",
  password: "supersecret",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Product],
  subscribers: [],
  migrations: [],
});
