import { Repository } from "typeorm";
import { CategoryEntity } from "./data/entity/CategoryEntity";
import AppDataSource from "../config/db";
import Page from "../models/Page";
import { PaginationParams } from "../models/PaginationParams";

class CategoryService {
    private categoryRepository: Repository<CategoryEntity>;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(CategoryEntity);
    }

    async getCategories(params: PaginationParams<CategoryEntity>): Promise<Page<CategoryEntity>> {
        const { pageIndex, pageSize, sort, sortBy } = params;

        const sortOrder = sort === "DESC" ? "DESC" : "ASC";

        const [result, total] = await this.categoryRepository.findAndCount({
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
}

export default CategoryService;