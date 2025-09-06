import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  Category.ELECTRONICS,
  Category.FASHION,
  Category.HOME,
  Category.BOOKS,
  Category.SPORTS,
  Category.TOYS,
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    description: 'A stylish and durable vintage leather jacket from the 80s. In great condition, with minor signs of wear that add to its character.',
    price: 75.00,
    category: Category.FASHION,
    imageUrl: 'https://source.unsplash.com/400x400/?leather,jacket',
    sellerId: 'user1',
    sellerName: 'JaneDoe'
  },
  {
    id: '2',
    title: 'Retro Gaming Console',
    description: 'Classic gaming console with two controllers and three popular games included. A must-have for any retro gaming enthusiast.',
    price: 120.00,
    category: Category.ELECTRONICS,
    imageUrl: 'https://source.unsplash.com/400x400/?retro,gaming,console',
    sellerId: 'user2',
    sellerName: 'JohnSmith'
  },
  {
    id: '3',
    title: 'Mid-Century Modern Armchair',
    description: 'An iconic armchair that brings a touch of mid-century elegance to any room. Solid wood frame and original upholstery.',
    price: 250.00,
    category: Category.HOME,
    imageUrl: 'https://source.unsplash.com/400x400/?mid-century,armchair',
    sellerId: 'user1',
    sellerName: 'JaneDoe'
  },
  {
    id: '4',
    title: 'The Lord of the Rings Trilogy',
    description: 'A beautiful hardcover box set of J.R.R. Tolkien\'s epic fantasy series. Perfect for both new readers and long-time fans.',
    price: 45.00,
    category: Category.BOOKS,
    imageUrl: 'https://source.unsplash.com/400x400/?fantasy,books',
    sellerId: 'user3',
    sellerName: 'Bookworm'
  },
  {
    id: '5',
    title: 'Professional Tennis Racket',
    description: 'A high-performance tennis racket, lightly used for one season. Strung and ready for the court.',
    price: 90.00,
    category: Category.SPORTS,
    imageUrl: 'https://source.unsplash.com/400x400/?tennis,racket',
    sellerId: 'user4',
    sellerName: 'SportySpice'
  },
    {
    id: '6',
    title: 'Wooden Chess Set',
    description: 'Hand-carved wooden chess set with intricate details. A beautiful and functional piece for any game lover.',
    price: 60.00,
    category: Category.TOYS,
    imageUrl: 'https://source.unsplash.com/400x400/?chess,set',
    sellerId: 'user2',
    sellerName: 'JohnSmith'
  },
    {
    id: '7',
    title: 'Acoustic Guitar',
    description: 'Full-sized acoustic guitar with a warm, rich tone. Comes with a soft case and a few picks. Ideal for beginners.',
    price: 150.00,
    category: Category.SPORTS,
    imageUrl: 'https://source.unsplash.com/400x400/?acoustic,guitar',
    sellerId: 'user1',
    sellerName: 'JaneDoe'
  },
  {
    id: '8',
    title: 'Designer Sunglasses',
    description: 'Authentic designer sunglasses with UV protection. Classic aviator style that never goes out of fashion.',
    price: 85.00,
    category: Category.FASHION,
    imageUrl: 'https://source.unsplash.com/400x400/?sunglasses,fashion',
    sellerId: 'user4',
    sellerName: 'SportySpice'
  }
];