
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { TrashIcon, CloseIcon } from '../components/ui/Icons';

const CartPage: React.FC = () => {
  const cart = useContext(CartContext);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const subtotal = cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const handleCheckout = () => {
    setShowCheckoutModal(true);
    cart?.clearCart();
  };
  
  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Shopping Cart</h2>
      {cart?.items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700">Your cart is empty</h3>
          <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
          <Link to="/" className="mt-6 inline-block bg-brand-green text-white font-bold py-2 px-6 rounded-full hover:bg-brand-green-light transition duration-300">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md">
              {cart.items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                  <div className="flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Qty: {item.quantity}</span>
                    <button onClick={() => cart.removeFromCart(item.id)} className="text-gray-500 hover:text-red-600">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="border-t my-4"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} className="mt-6 w-full bg-brand-green text-white font-bold py-3 rounded-full hover:bg-brand-green-light transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full relative">
            <button onClick={() => setShowCheckoutModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                <CloseIcon className="h-6 w-6"/>
            </button>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">Your order has been placed successfully. (This is a simulation).</p>
            <Link to="/" onClick={() => setShowCheckoutModal(false)} className="inline-block bg-brand-green text-white font-bold py-2 px-6 rounded-full hover:bg-brand-green-light transition duration-300">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
