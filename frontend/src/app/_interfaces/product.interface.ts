import { User } from "./user.interface";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  quantity: number;
  rating?: number;
  number_rating?: number;
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

export interface Order {
  id: number;
  user_id: number;
  items: CartItem[];
  shipping_method: string;
  order_date: string;
  total_amount: number;
  status: string;
  paid: boolean;
  user: User;
  rating:number;
}

export interface Rating {
  id?: number;
  user_id: number;
  product_id: number;
  comment: string;
  rating: number;
}




