import { DataSource } from "typeorm";
import { ProductEntity } from "../product/data/entity/ProductEntity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  // port: 5433,
  port: 5432,
  username: "postgres",
  password: "1",
  database: "gungdecor-db",
  entities: [ProductEntity],
  synchronize: true, // dev only
});

export default AppDataSource;
