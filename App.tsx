import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellPage from './pages/SellPage';
import CartPage from './pages/CartPage';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const auth = React.useContext(AuthContext);
  if (auth?.loading) {
    return <div>Loading...</div>;
  }
  return auth?.user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow bg-brand-beige">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route
                    path="/sell"
                    element={
                      <PrivateRoute>
                        <SellPage />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
              <footer className="bg-brand-brown text-white py-4 text-center">
                  <p>&copy; {new Date().getFullYear()} EcoFinds. All rights reserved.</p>
              </footer>
            </div>
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
