import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShoppingBag, Store, BarChart2 } from 'lucide-react';
import { mockUsers, mockProducts } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const totalUsers = mockUsers.filter(user => user.role === 'buyer').length;
  const totalSellers = mockUsers.filter(user => user.role === 'seller').length;
  const pendingSellers = mockUsers.filter(user => user.role === 'seller' && user.sellerStatus === 'pending').length;
  const totalProducts = mockProducts.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-3xl font-bold mt-1">{totalUsers}</h3>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sellers</p>
              <h3 className="text-3xl font-bold mt-1">{totalSellers}</h3>
              {pendingSellers > 0 && (
                <span className="text-sm text-warning-600">{pendingSellers} pending approval</span>
              )}
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <Store className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-3xl font-bold mt-1">{totalProducts}</h3>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1">$0.00</h3>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <BarChart2 className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/sellers"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <Store className="h-8 w-8 text-primary-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Manage Sellers</h3>
          <p className="text-gray-600">Review and manage seller applications and accounts</p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <Users className="h-8 w-8 text-primary-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <p className="text-gray-600">View and manage user accounts</p>
        </Link>

        <Link
          to="/admin/products"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <ShoppingBag className="h-8 w-8 text-primary-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
          <p className="text-gray-600">Review and manage product listings</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;