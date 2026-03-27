export interface FoodItem {
  id: string;
  name: string;
  store_name: string;
  original_price: number;
  discount_price: number;
  stock: number;
  pickup_time: string;
  image_url: string;
  created_at: string;
  user_id?: string;
  sold_at?: string | null;
  avg_rating?: number;
  rating_count?: number;
}

export interface Rating {
  id: string;
  item_id: string;
  user_id: string;
  rating: number;
  created_at: string;
}

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  updated_at: string;
}