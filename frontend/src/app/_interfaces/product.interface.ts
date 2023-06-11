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
  category?: categoriesUnion;
  brand?: categoriesUnion;
  is_featured?: boolean;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}


export const categories = ['mode', 'electronics', 'beauty'] as const;
export type categoriesUnion = typeof categories[number];
 
