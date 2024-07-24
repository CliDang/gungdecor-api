import { Repository } from 'typeorm';
import { ProductEntity } from './data/entity/ProductEntity';
import Page from '../models/Page';
import { PaginationParams } from '../models/PaginationParams';
import { CreateProductRequest, UpdateProductRequest } from './data/request/ProductRequest';
import AppDataSource from '../config/db';
import { ProductPayload } from './data/payload/ProductPayload';
import { CategoryEnum } from '../enums/CategoryEnum';

class ProductService {
  private productRepository: Repository<ProductEntity>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(ProductEntity);
  }

  async getProducts(params: PaginationParams<ProductPayload>): Promise<ProductPayload[]> {
    const { pageIndex, pageSize, sort, sortBy } = params;

    const sortOrder = sort === "DESC" ? "DESC" : "ASC";

    const [result, total] = await this.productRepository.findAndCount({
      order: { [sortBy]: sortOrder },
      skip: pageIndex * pageSize,
      take: pageSize,
    });

    const products: ProductPayload[] = result.map((product: ProductEntity) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      displayName: product.display_name,
      imageUrl: product.image_url ?? [],
      description: product.description ?? undefined,
      category: product.category ?? undefined,
      type: product.type ?? undefined,
      status: product.status,
      createdDate: product.created_date,
      lastActionDate: product.last_action_date,
    }));

    return products;
  }

  async createProduct(request: CreateProductRequest): Promise<ProductEntity> {
    const product = this.productRepository.create(request);
    return this.productRepository.save(product);
  }

  async updateProduct(request: UpdateProductRequest): Promise<ProductEntity> {
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
