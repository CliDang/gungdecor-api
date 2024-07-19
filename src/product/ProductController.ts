import { Request, Response, Router } from "express";
import ProductService from "./ProductService";
import { ProductEntity } from "./data/entity/ProductEntity";
import { PaginationParams } from "../models/PaginationParams";
import { ProductPayload } from "./data/payload/ProductPayload";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "./data/request/ProductRequest";

const productRouter = Router();
const productService = new ProductService();

productRouter.get("/products", async (req: Request, res: Response) => {
  const {
    pageIndex = 0,
    pageSize = 10,
    sort = "ASC",
    sortBy = "id",
  } = req.query;

  const page = parseInt(pageIndex as string, 10);
  const size = parseInt(pageSize as string, 10);
  const sortOrder = sort === "DESC" ? "DESC" : "ASC";
  const sortField = sortBy as keyof ProductEntity;

  const params: PaginationParams<ProductEntity> = {
    pageIndex: page,
    pageSize: size,
    sort: sortOrder,
    sortBy: sortField,
  };

  try {
    const result = await productService.getProducts(params);
    const response: ProductPayload = {
      success: true,
      payload: result,
      error: null,
    };

    res.json(response);
  } catch (error: any) {
    const response = {
      success: false,
      payload: null,
      error: error,
    };

    res.status(500).json(response);
  }
});

productRouter.post("/products", async (req: Request, res: Response) => {
  const request: CreateProductRequest = req.body;

  try {
    const product = await productService.createProduct(request);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

productRouter.put("/products/:id", async (req: Request, res: Response) => {
  const request: UpdateProductRequest = {
    ...req.body,
    id: parseInt(req.params.id, 10),
  };

  try {
    const product = await productService.updateProduct(request);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default productRouter;
