
export enum Category {
  ELECTRONICS = "Electronics",
  FASHION = "Fashion",
  HOME = "Home & Garden",
  BOOKS = "Books",
  SPORTS = "Sports & Outdoors",
  TOYS = "Toys & Games",
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}
