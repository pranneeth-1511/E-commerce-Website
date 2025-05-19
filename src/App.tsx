import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellerDashboard from './pages/seller/SellerDashboard';
import AddProductPage from './pages/seller/AddProductPage';
import EditProductPage from './pages/seller/EditProductPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageSellers from './pages/admin/ManageSellers';
import ManageUsers from './pages/admin/ManageUsers';
import ManageProducts from './pages/admin/ManageProducts';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import { ToasterProvider } from './components/ui/Toaster';

function App() {
  const location = useLocation();
  const { user } = useAuth();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ToasterProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Seller Routes */}
          <Route path="seller" element={
            <ProtectedRoute requiredRole="seller">
              <SellerDashboard />
            </ProtectedRoute>
          } />
          <Route path="seller/add-product" element={
            <ProtectedRoute requiredRole="seller">
              <AddProductPage />
            </ProtectedRoute>
          } />
          <Route path="seller/edit-product/:id" element={
            <ProtectedRoute requiredRole="seller">
              <EditProductPage />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="admin/sellers" element={
            <ProtectedRoute requiredRole="admin">
              <ManageSellers />
            </ProtectedRoute>
          } />
          <Route path="admin/users" element={
            <ProtectedRoute requiredRole="admin">
              <ManageUsers />
            </ProtectedRoute>
          } />
          <Route path="admin/products" element={
            <ProtectedRoute requiredRole="admin">
              <ManageProducts />
            </ProtectedRoute>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ToasterProvider>
  );
}

export default App;