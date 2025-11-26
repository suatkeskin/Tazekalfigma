export type Category =
  | "dairy"
  | "meat"
  | "bakery"
  | "beverages"
  | "cosmetics"
  | "medicine"
  | "vegetables"
  | "fruits"
  | "other";

export interface Product {
  id: string;
  name: string;
  category: Category;
  expirationDate: Date;
  addedDate: Date;
  notes?: string;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: string;
}
