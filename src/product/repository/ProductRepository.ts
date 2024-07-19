import { Repository } from 'typeorm';
import { ProductEntity } from '../data/entity/ProductEntity';
import AppDataSource from '../../config/db';
import Page from '../../models/Page';
import { PaginationParams } from '../../models/PaginationParams';
import { CreateProductRequest, UpdateProductRequest } from '../data/request/ProductRequest';

class ProductRepository extends Repository<ProductEntity> {

  async getAllProducts(params: PaginationParams<ProductEntity>): Promise<Page<ProductEntity>> {
    const [products, total] = await this.findAndCount({
      skip: params.pageIndex * params.pageSize,
      take: params.pageSize,
      order: {
        [params.sortBy]: params.sort,
      },
    });

    const totalPages = Math.ceil(total / params.pageSize);

    return {
      rows: products,
      totalElements: total,
      totalPages,
      currentPage: params.pageIndex,
      pageSize: params.pageSize
    };
  }

  findOneById(id: number): Promise<ProductEntity | null> {
    return this.findOne({ where: { id } });
  }

  async createProduct(data: CreateProductRequest): Promise<ProductEntity> {
    const product = this.create(data);
    return this.save(product);
  }

  async updateProduct(id: number, data: UpdateProductRequest): Promise<ProductEntity> {
    const product = await this.findOneById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, data);
    return this.save(product);
  }
}

export default ProductRepository;
