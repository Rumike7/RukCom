import { AdminEnumsService } from "@app/_services/admin-enums.service";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  quantity: number;
  rating?: number;
  numRatings?: number;
  type?: string;
  about?: string;
  image?: any;
  imgpath?: string;
  category?: string;
  brand?: string;
  is_featured?: boolean;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product,
  quantity: number
}




