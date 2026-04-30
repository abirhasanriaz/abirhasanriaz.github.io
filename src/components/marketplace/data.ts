// Product type aligned with database row
export type Product = {
  id: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
};

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Accessories",
  "Lifestyle",
];
