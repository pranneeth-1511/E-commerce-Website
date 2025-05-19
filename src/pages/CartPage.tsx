import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="col-span-6">
                <span className="text-sm font-medium text-gray-700">Product</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-gray-700">Price</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-gray-700">Quantity</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm font-medium text-gray-700">Total</span>
              </div>
            </div>
            
            {/* Cart items list */}
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.productId} className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Product info */}
                    <div className="md:col-span-6 flex items-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <Link 
                          to={`/products/${item.productId}`}
                          className="text-lg font-medium text-gray-900 hover:text-primary-600"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-sm text-gray-500">Category: {item.product.category}</p>
                        <button
                          type="button"
                          className="mt-1 text-sm text-error-600 hover:text-error-800 flex items-center md:hidden"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 flex justify-between md:block md:text-center">
                      <span className="text-sm font-medium text-gray-500 md:hidden">Price:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${item.product.price.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-between items-center md:justify-center">
                      <span className="text-sm font-medium text-gray-500 md:hidden">Quantity:</span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="flex items-center justify-center w-8 h-8 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="flex items-center justify-center w-8 h-8 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 flex justify-between md:block md:text-right">
                      <span className="text-sm font-medium text-gray-500 md:hidden">Total:</span>
                      <span className="text-sm font-bold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Remove button - Desktop */}
                    <div className="hidden md:flex md:col-span-12 md:justify-end mt-2">
                      <button
                        type="button"
                        className="text-sm text-error-600 hover:text-error-800 flex items-center"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cart actions */}
          <div className="mt-4 flex justify-between items-center">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
            <button
              type="button"
              className="text-sm text-error-600 hover:text-error-800 flex items-center"
              onClick={() => clearCart()}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({items.length} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(subtotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-base font-bold">Total</span>
                <span className="text-base font-bold">
                  ${(subtotal + (subtotal * 0.08)).toFixed(2)}
                </span>
              </div>
            </div>
            
            <button
              type="button"
              className="btn btn-primary w-full flex items-center justify-center"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
            
            {!isAuthenticated && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                You'll need to sign in before completing your purchase
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;