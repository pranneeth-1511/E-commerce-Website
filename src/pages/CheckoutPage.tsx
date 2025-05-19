import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Check, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Address } from '../types';

const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Shipping information state
  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: user?.name || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  });
  
  // Payment information state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order processing
    setOrderPlaced(true);
    
    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 500);
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  if (!user) {
    navigate('/login', { state: { from: '/checkout' } });
    return null;
  }
  
  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }
  
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-success-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-success-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your order has been placed and will be processed shortly.
          </p>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-left">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">ORD-{Date.now().toString().substring(5)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold">${(subtotal + (subtotal * 0.08)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">Credit Card</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address.
              </p>
            </div>
          </div>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      {/* Checkout progress */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`h-1 flex-1 mx-2 ${
            step >= 2 ? 'bg-primary-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-medium">Shipping</span>
          <span className="text-sm font-medium">Payment</span>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="input"
                        value={shippingAddress.fullName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="input"
                        value={shippingAddress.phone}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        className="input"
                        value={shippingAddress.street}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="input"
                        value={shippingAddress.city}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="input"
                        value={shippingAddress.state}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        className="input"
                        value={shippingAddress.postalCode}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="input"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          country: e.target.value
                        }))}
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      className="btn btn-outline flex items-center"
                      onClick={() => navigate('/cart')}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center"
                    >
                      Continue to Payment
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </form>
              </>
            )}
            
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <div className="mb-6">
                  <div className="flex space-x-4 mb-4">
                    <div
                      className={`flex-1 border rounded-md p-4 cursor-pointer ${
                        paymentMethod === 'credit-card' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('credit-card')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                          paymentMethod === 'credit-card' 
                            ? 'border-primary-500' 
                            : 'border-gray-400'
                        }`}>
                          {paymentMethod === 'credit-card' && (
                            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Credit Card</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex-1 border rounded-md p-4 cursor-pointer ${
                        paymentMethod === 'paypal' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                          paymentMethod === 'paypal' 
                            ? 'border-primary-500' 
                            : 'border-gray-400'
                        }`}>
                          {paymentMethod === 'paypal' && (
                            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">PayPal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {paymentMethod === 'credit-card' && (
                    <form onSubmit={handlePaymentSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              className="input pl-10"
                              placeholder="1234 5678 9012 3456"
                              value={paymentInfo.cardNumber}
                              onChange={handlePaymentChange}
                              required
                              maxLength={19}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            className="input"
                            placeholder="John Doe"
                            value={paymentInfo.cardName}
                            onChange={handlePaymentChange}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              name="expiry"
                              className="input"
                              placeholder="MM/YY"
                              value={paymentInfo.expiry}
                              onChange={handlePaymentChange}
                              required
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                              CVC
                            </label>
                            <input
                              type="text"
                              id="cvc"
                              name="cvc"
                              className="input"
                              placeholder="123"
                              value={paymentInfo.cvc}
                              onChange={handlePaymentChange}
                              required
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-6">
                        <button
                          type="button"
                          className="btn btn-outline flex items-center"
                          onClick={() => setStep(1)}
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary flex items-center"
                        >
                          Place Order
                          <Check className="h-4 w-4 ml-2" />
                        </button>
                      </div>
                    </form>
                  )}
                  
                  {paymentMethod === 'paypal' && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-4">
                        You will be redirected to PayPal to complete your purchase securely.
                      </p>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="btn btn-outline flex items-center"
                          onClick={() => setStep(1)}
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back
                        </button>
                        <button
                          type="button"
                          className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                          onClick={handlePaymentSubmit}
                        >
                          Continue with PayPal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="max-h-60 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.productId} className="flex py-3 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{item.product.title}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
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
            
            <div className="border-t border-gray-200 pt-4 mb-2">
              <div className="flex justify-between">
                <span className="text-base font-bold">Total</span>
                <span className="text-base font-bold">
                  ${(subtotal + (subtotal * 0.08)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;