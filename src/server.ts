import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/db";
import apiRoutes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1", apiRoutes);

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  switch (err.status) {
      case 500:
          res.status(500).json({
              "success": false,
              "code": 4001,
              "error": err.message || "Server Error"
          });
          break;
      case 404:
          res.status(404).json({
              "success": false,
              "code": 4001,
              "error": err.message || "Resource not found"
          });
          break;
      case 401:
          res.status(401).json({
              "success": false,
              "code": 2001,
              "error": err.message || "Unauthorized"
          });
          break;
      case 403:
          res.status(403).json({
              "success": false,
              "code": 2002,
              "error": err.message || "Forbidden"
          });
          break;

      default:
          res.status(404).json({
              "success": false,
              "code": 4001,
              "error": err.message || "Resource not found"
          });
          break;
  }
});

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
