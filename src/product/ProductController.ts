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
    pageSize = 100000,
    sort = "ASC",
    sortBy = "id",
  } = req.query;

  const page = parseInt(pageIndex as string, 10);
  const size = parseInt(pageSize as string, 10);
  const sortOrder = sort === "DESC" ? "DESC" : "ASC";
  const sortField = sortBy as keyof ProductPayload;

  const params: PaginationParams<ProductPayload> = {
    pageIndex: page,
    pageSize: size,
    sort: sortOrder,
    sortBy: sortField,
  };

  try {
    console.log('Fetching products with params:', params);
    const result = await productService.getProducts(params);
    const response = {
      success: true,
      payload: result,
      error: null,
    };

    console.log('Fetched products successfully !!!');
    res.json(response);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    const response = {
      success: false,
      payload: null,
      error: 'An error occurred while fetching products.',
    };

    res.status(500).json(response);
  }
});

productRouter.post("/products", async (req: Request, res: Response) => {
  const request: CreateProductRequest = req.body;

  try {
    console.log('Creating product with request:', request);
    const product = await productService.createProduct(request);
    console.log('Product created successfully !!!');
    res.status(201).json(product);
  } catch (error: any) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'An error occurred while creating the product.' });
  }
});

productRouter.put("/products/:id", async (req: Request, res: Response) => {
  const request: UpdateProductRequest = {
    ...req.body,
    id: parseInt(req.params.id, 10),
  };

  try {
    console.log('Updating product with request:', request);
    const product = await productService.updateProduct(request);
    console.log('Product updated successfully !!!');
    res.status(200).json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    res.status(400).json({ error: 'An error occurred while updating the product.' });
  }
});

export default productRouter;
