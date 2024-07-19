import { Repository } from "typeorm";
import { PaginationParams } from "../../models/PaginationParams";
import { CategoryEntity } from "../data/entity/CategoryEntity";
import Page from "../../models/Page";

class CategoryRepository extends Repository<CategoryEntity> {

    async getAllCategories(params: PaginationParams<CategoryEntity>): Promise<Page<CategoryEntity>> {
        const [categories, total] = await this.findAndCount({
            skip: params.pageIndex * params.pageSize,
            take: params.pageSize,
            order: {
                [params.sortBy]: params.sort,
            },
        });

        const totalPages = Math.ceil(total / params.pageSize);

        return {
            rows: categories,
            totalElements: total,
            totalPages,
            currentPage: params.pageIndex,
            pageSize: params.pageSize
        };
    }

    findOneById(id: number): Promise<CategoryEntity | null> {
        return this.findOne({ where: { id } });
    }

    async createCategory(data: CategoryEntity): Promise<CategoryEntity> {
        const category = this.create(data);
        return this.save(category);
    }

    async updateCategory(id: number, data: CategoryEntity): Promise<CategoryEntity> {
        const category = await this.findOneById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        Object.assign(category, data);
        return this.save(category);
    }
}

export default CategoryRepository;