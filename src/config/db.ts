import { DataSource } from "typeorm";
import { ProductEntity } from "../product/data/entity/ProductEntity";
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ProductEntity],
  synchronize: true, // dev only
});

export default AppDataSource;
