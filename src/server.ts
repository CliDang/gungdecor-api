import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/db";
import apiRoutes from "./routes";
import { corsOptions } from "./middlewares/cors";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1", apiRoutes);

const PORT = process.env.PORT;

// Connect to Database
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
