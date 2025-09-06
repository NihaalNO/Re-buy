import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ProductContext } from '../contexts/ProductContext';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

const SellPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState<Category>(Category.FASHION);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const auth = useContext(AuthContext);
    const productContext = useContext(ProductContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth?.user) {
            navigate('/login');
        }
    }, [auth, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth?.user || !productContext) return;

        if (!title || !description || !price || !category || !imagePreview) {
            setMessage('Please fill out all fields and upload an image.');
            return;
        }

        const newProductData = {
            title,
            description,
            price: parseFloat(price),
            category,
            imageUrl: imagePreview, 
        };
        
        productContext.addProduct(newProductData, auth.user);
        setMessage('Product listed successfully! Redirecting...');
        setTimeout(() => navigate('/'), 2000);
    };

    if (!auth?.user) {
        return null; // or a loading spinner
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">List an Item</h2>
                {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green"/>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green"/>
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green">
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto"/>
                                ) : (
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-green hover:text-brand-green-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-green">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 1MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-green hover:bg-brand-green-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green">
                            List Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellPage;
