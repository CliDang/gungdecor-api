export interface CreateProductRequest {
  name: string;
  displayName: string;
  price: number;
  imageUrl: string[];
  description: string;
  categoryId: number;
  type: string;
  status: string;
}

export interface UpdateProductRequest {
  id: number;
  name?: string;
  displayName?: string;
  price?: number;
  imageUrl?: string[];
  description?: string;
  categoryId?: number;
  type?: string;
  status?: string;
}
