import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  BarChart2, 
  PlusCircle,
  List,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('month');
  
  // Filter products to show only those belonging to the current seller
  const sellerProducts = mockProducts.filter(product => product.sellerId === user?.id);

  const renderStatusBanner = () => {
    if (!user?.sellerStatus || user.sellerStatus === 'pending') {
      return (
        <div className="bg-warning-50 border-l-4 border-warning-500 p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-warning-500 mr-2" />
            <div>
              <h3 className="text-warning-800 font-medium">Account Pending Approval</h3>
              <p className="text-warning-700 text-sm">
                Your seller account is currently under review. You can add products, but they won't be visible to buyers until your account is approved.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (user.sellerStatus === 'rejected') {
      return (
        <div className="bg-error-50 border-l-4 border-error-500 p-4 mb-6">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-error-500 mr-2" />
            <div>
              <h3 className="text-error-800 font-medium">Account Rejected</h3>
              <p className="text-error-700 text-sm">
                Your seller account application has been rejected. Please contact support for more information.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (user.sellerStatus === 'approved') {
      return (
        <div className="bg-success-50 border-l-4 border-success-500 p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
            <div>
              <h3 className="text-success-800 font-medium">Account Approved</h3>
              <p className="text-success-700 text-sm">
                Your seller account is active. You can list products and they will be visible to buyers.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Link 
          to="/seller/add-product" 
          className={`btn ${
            user?.sellerStatus === 'rejected' 
              ? 'btn-outline cursor-not-allowed opacity-50' 
              : 'btn-primary'
          }`}
          onClick={(e) => {
            if (user?.sellerStatus === 'rejected') {
              e.preventDefault();
            }
          }}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Product
        </Link>
      </div>

      {renderStatusBanner()}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-3xl font-bold mt-1">{sellerProducts.length}</h3>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              {sellerProducts.length} active listings
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-3xl font-bold mt-1">0</h3>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs px-2 py-1 bg-success-100 text-success-800 rounded-full flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              0%
            </span>
            <span className="text-sm text-gray-500 ml-2">vs. last {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1">$0.00</h3>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs px-2 py-1 bg-success-100 text-success-800 rounded-full flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              0%
            </span>
            <span className="text-sm text-gray-500 ml-2">vs. last {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <h3 className="text-3xl font-bold mt-1">0</h3>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs px-2 py-1 bg-success-100 text-success-800 rounded-full flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              0%
            </span>
            <span className="text-sm text-gray-500 ml-2">vs. last {timeRange}</span>
          </div>
        </div>
      </div>
      
      {/* Time Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-md focus:z-10 focus:outline-none ${
              timeRange === 'week' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none ${
              timeRange === 'month' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-md focus:z-10 focus:outline-none ${
              timeRange === 'year' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sales Analytics</h2>
            <div>
              <select className="input text-sm py-1">
                <option value="orders">Orders</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No sales data yet</p>
            </div>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products List */}
      <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Products</h2>
          <Link 
            to="/seller/add-product" 
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            onClick={(e) => {
              if (user?.sellerStatus === 'rejected') {
                e.preventDefault();
              }
            }}
          >
            Add New
          </Link>
        </div>
        
        {sellerProducts.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products listed yet</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              Start adding products to your store to begin selling.
            </p>
            {user?.sellerStatus !== 'rejected' && (
              <Link to="/seller/add-product" className="btn btn-primary">
                Add Your First Product
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sellerProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={product.imageUrl} 
                            alt={product.title}
                            className="h-10 w-10 object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {product.id.split('-')[1]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.rating} ({product.reviews})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-primary-600 hover:text-primary-800 mr-3"
                      >
                        View
                      </Link>
                      <Link
                        to={`/seller/edit-product/${product.id}`}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;