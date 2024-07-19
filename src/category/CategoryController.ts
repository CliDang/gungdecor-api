import { Router } from "express";
import CategoryService from "./CategoryService";
import { CategoryEntity } from "./data/entity/CategoryEntity";
import { PaginationParams } from "../models/PaginationParams";

const categoryRouter = Router();
const categoryService = new CategoryService();

categoryRouter.get("/categories", async (req, res) => {
    const {
        pageIndex = 0,
        pageSize = 10,
        sort = "ASC",
        sortBy = "id",
    } = req.query;

    const page = parseInt(pageIndex as string, 10);
    const size = parseInt(pageSize as string, 10);
    const sortOrder = sort === "DESC" ? "DESC" : "ASC";
    const sortField = sortBy as keyof CategoryEntity;

    const params: PaginationParams<CategoryEntity> = {
        pageIndex: page,
        pageSize: size,
        sort: sortOrder,
        sortBy: sortField,
    };

    try {
        const result = await categoryService.getCategories(params);
        const response = {
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