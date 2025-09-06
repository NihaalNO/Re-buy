
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { ShoppingCartIcon, UserIcon, LeafIcon } from './ui/Icons';

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <LeafIcon className="h-8 w-8 text-brand-green" />
          <h1 className="text-2xl font-bold text-brand-green">EcoFinds</h1>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/sell" className="text-gray-600 hover:text-brand-green font-medium">Sell</Link>
          {auth?.user ? (
            <>
              <span className="text-gray-700">Hi, {auth.user.username}</span>
              <button onClick={auth.logout} className="text-gray-600 hover:text-brand-green font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-brand-green font-medium">Login</Link>
              <Link to="/register" className="bg-brand-green text-white px-4 py-2 rounded-full hover:bg-brand-green-light transition duration-300">Register</Link>
            </>
          )}
          <Link to="/cart" className="relative text-gray-600 hover:text-brand-green">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
