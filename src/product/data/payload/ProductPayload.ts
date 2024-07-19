import { ProductEntity } from "../entity/ProductEntity";

export interface ProductPayload {
  success: boolean;
  payload: {
    rows: ProductEntity[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  error: string | null;
}
