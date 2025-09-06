
import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { Category, Product } from '../types';
import { SearchIcon } from '../components/ui/Icons';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-brand-green text-white p-8 rounded-lg mb-8 text-center">
        <h2 className="text-4xl font-bold mb-2">Find Your Next Treasure</h2>
        <p className="text-lg">Sustainable shopping starts here. Buy and sell pre-loved items with ease.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
          className="w-full md:w-1/4 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
