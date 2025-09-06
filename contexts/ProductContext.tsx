import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product, User } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'sellerId' | 'sellerName'>, seller: User) => void;
}

export const ProductContext = createContext<ProductContextType | null>(null);

const PRODUCT_STORAGE_KEY = 'eco-products';

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const storedProducts = localStorage.getItem(PRODUCT_STORAGE_KEY);
      if (storedProducts) {
        return JSON.parse(storedProducts);
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
      localStorage.removeItem(PRODUCT_STORAGE_KEY);
    }
    return MOCK_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  }, [products]);


  const addProduct = (productData: Omit<Product, 'id' | 'sellerId' | 'sellerName'>, seller: User) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      sellerId: seller.id,
      sellerName: seller.username,
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
