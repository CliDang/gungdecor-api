import { CategoryEntity } from "../../../category/data/entity/CategoryEntity";
import { ProductEntity } from "../entity/ProductEntity";

// export interface ProductPayload {
//   success: boolean;
//   payload: {
//     rows: ProductEntity[];
//     totalElements: number;
//     totalPages: number;
//     currentPage: number;
//     pageSize: number;
//   };
//   error: string | null;
// }

export interface ProductPayload {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly displayName: string;
  readonly imageUrl: string[];
  readonly description: string;
  readonly category: CategoryEntity;
  readonly type: string;
  readonly status: string;
  readonly createdDate: Date;
  readonly lastActionDate: Date;
}
