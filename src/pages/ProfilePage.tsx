import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  Edit3,
  Calendar,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('account');
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="flex items-center mb-6">
              {user.avatar ? (
                <img 
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-primary-600" />
                </div>
              )}
              <div className="ml-4">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1">
              <button
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'account' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('account')}
              >
                <UserIcon className="h-5 w-5 mr-3" />
                Account Information
              </button>
              <button
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'orders' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <Package className="h-5 w-5 mr-3" />
                My Orders
              </button>
              <button
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'wishlist' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart className="h-5 w-5 mr-3" />
                Wishlist
              </button>
              <button
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'settings' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </button>
              
              <hr className="my-2 border-gray-200" />
              
              <button
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-error-700 hover:bg-error-50 rounded-md"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4">
          {activeTab === 'account' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Account Information</h1>
                <button className="btn btn-outline flex items-center">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Full Name</span>
                      <span className="block mt-1">{user.name}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Email Address</span>
                      <span className="block mt-1">{user.email}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Account Type</span>
                      <span className="block mt-1 capitalize">{user.role}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Member Since</span>
                      <span className="block mt-1">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Default Address</h3>
                  <div className="border border-gray-200 rounded-md p-4">
                    <p className="text-gray-600 mb-4">You haven't added an address yet.</p>
                    <button className="btn btn-primary text-sm">
                      Add New Address
                    </button>
                  </div>
                </div>
              </div>
              
              {user.role === 'seller' && (
                <div className="mt-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Seller Information</h3>
                    <button 
                      className="btn btn-primary text-sm"
                      onClick={() => navigate('/seller')}
                    >
                      Go to Seller Dashboard
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-center">
                        <ShoppingBag className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                        <span className="block text-2xl font-bold">0</span>
                        <span className="text-sm text-gray-500">Products Listed</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-center">
                        <Package className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                        <span className="block text-2xl font-bold">0</span>
                        <span className="text-sm text-gray-500">Orders Received</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-center">
                        <Calendar className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                        <span className="block text-2xl font-bold">0</span>
                        <span className="text-sm text-gray-500">Active Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">My Orders</h1>
              
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-4">
                  Looks like you haven't made any orders yet.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/products')}
                >
                  Start Shopping
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
              
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-4">
                  Add items you like to your wishlist and they will show up here.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/products')}
                >
                  Browse Products
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Order Updates</h4>
                        <p className="text-sm text-gray-500">Receive updates about your orders</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="orderUpdates" id="orderUpdates" 
                          className="absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer focus:outline-none checked:right-0 checked:border-primary-600 transition-all duration-200"
                          defaultChecked
                        />
                        <label htmlFor="orderUpdates" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Promotions</h4>
                        <p className="text-sm text-gray-500">Receive emails about new promotions</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="promotions" id="promotions" 
                          className="absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer focus:outline-none checked:right-0 checked:border-primary-600 transition-all duration-200"
                          defaultChecked
                        />
                        <label htmlFor="promotions" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Password</h3>
                  <button className="btn btn-outline">
                    Change Password
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Delete Account</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Permanently delete your account and all your data. This action cannot be undone.
                  </p>
                  <button className="btn bg-error-600 hover:bg-error-700 text-white">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;