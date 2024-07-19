import { Repository } from 'typeorm';
import { ProductEntity } from './data/entity/ProductEntity';
import Page from '../models/Page';
import { PaginationParams } from '../models/PaginationParams';
import { CreateProductRequest, UpdateProductRequest } from './data/request/ProductRequest';
import AppDataSource from '../config/db';
import { ProductPayload } from './data/payload/ProductPayload';

class ProductService {
  private productRepository: Repository<ProductEntity>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(ProductEntity);
  }

  async getProducts(params: PaginationParams<ProductPayload>): Promise<Page<ProductPayload>> {
    const { pageIndex, pageSize, sort, sortBy } = params;

    const sortOrder = sort === "DESC" ? "DESC" : "ASC";

    const [result, total] = await this.productRepository.findAndCount({
      order: { [sortBy]: sortOrder },
      skip: pageIndex * pageSize,
      take: pageSize,
    });

    return {
      rows: result,
      totalElements: total,
      currentPage: pageIndex,
      totalPages: Math.ceil(total / pageSize),
      pageSize: pageSize,
    };
  }

  async createProduct(request: CreateProductRequest): Promise<ProductPayload> {
    const product = this.productRepository.create(request);
    return this.productRepository.save(product);
  }

  async updateProduct(request: UpdateProductRequest): Promise<ProductPayload> {
    const product = await this.productRepository.findOne({
      where: { id: request.id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    Object.assign(product, request);

    return this.productRepository.save(product);
  }
}

export default ProductService;
