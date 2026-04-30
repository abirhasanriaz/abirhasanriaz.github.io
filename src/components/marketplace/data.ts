import watch from "@/assets/product-watch.jpg";
import sneakers from "@/assets/product-sneakers.jpg";
import lamp from "@/assets/product-lamp.jpg";
import bag from "@/assets/product-bag.jpg";
import sunglasses from "@/assets/product-sunglasses.jpg";
import mug from "@/assets/product-mug.jpg";
import phone from "@/assets/product-phone.jpg";
import headphones from "@/assets/hero-product.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
};

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Accessories",
  "Lifestyle",
];

export const products: Product[] = [
  { id: "1", name: "Studio Pro Headphones", brand: "Noir Audio", price: 349, originalPrice: 429, image: headphones, category: "Electronics", rating: 4.9 },
  { id: "2", name: "Series 9 Smartwatch", brand: "Tempo", price: 429, image: watch, category: "Electronics", rating: 4.8 },
  { id: "3", name: "Classic Leather Sneakers", brand: "Atelier", price: 189, originalPrice: 230, image: sneakers, category: "Fashion", rating: 4.7 },
  { id: "4", name: "Arc Desk Lamp", brand: "Form Studio", price: 145, image: lamp, category: "Home", rating: 4.9 },
  { id: "5", name: "Heritage Backpack", brand: "Wayfarer", price: 220, originalPrice: 280, image: bag, category: "Accessories", rating: 4.8 },
  { id: "6", name: "Aviator Sunglasses", brand: "Lumen", price: 165, image: sunglasses, category: "Accessories", rating: 4.6 },
  { id: "7", name: "Matte Ceramic Mug", brand: "Kiln & Co", price: 28, image: mug, category: "Lifestyle", rating: 4.9 },
  { id: "8", name: "Edge Pro Smartphone", brand: "Apex", price: 999, originalPrice: 1099, image: phone, category: "Electronics", rating: 4.8 },
];
