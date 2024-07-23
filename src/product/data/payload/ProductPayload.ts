import { CategoryEnum } from "../../../enums/CategoryEnum";

export interface ProductPayload {
  id: number;
  name: string;
  price: number;
  displayName: string;
  imageUrl?: string[];
  description?: string;
  category?: CategoryEnum;
  type?: string;
  status: string;
  createdDate: Date;
  lastActionDate?: Date;
}
