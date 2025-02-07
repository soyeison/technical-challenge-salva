import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";

// TODO: Agregar estoa datos al .env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5550,
  username: "postgres",
  password: "supersecret",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
