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
}

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  updated_at: string;
}