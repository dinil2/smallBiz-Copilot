export type BusinessType =
  | "Clothing & Fashion"
  | "Restaurant / Café"
  | "Electronics"
  | "Pharmacy"
  | "Salon & Beauty"
  | "Grocery / Supermarket"
  | "Online Store"
  | "Other";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  shop_name: string | null;
  business_type: BusinessType | string | null;
  business_type_other: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  date: string;
  product_name: string;
  category: string;
  quantity: number;
  unit_price: number;
  cost_price: number;
  revenue: number;
  cost: number;
  profit: number;
  created_at?: string;
}

export interface AIChatMessage {
  id?: string;
  user_id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}
