import React, { useState } from 'react';
import { ArrowLeft, Check, X, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockUsers } from '../../data/mockData';
import { User, SellerStatus } from '../../types';
import { useToaster } from '../../components/ui/Toaster';

const ManageSellers: React.FC = () => {
  const { showToast } = useToaster();
  const [sellers, setSellers] = useState(
    mockUsers.filter(user => user.role === 'seller')
  );

  const handleStatusChange = (sellerId: string, newStatus: SellerStatus) => {
    setSellers(prev => 
      prev.map(seller => 
        seller.id === sellerId 
          ? { ...seller, sellerStatus: newStatus }
          : seller
      )
    );

    showToast(
      `Seller ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully`,
      'success'
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/admin"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-8">Manage Sellers</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sellers.map((seller) => (
                <tr key={seller.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {seller.avatar ? (
                        <img
                          src={seller.avatar}
                          alt={seller.name}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">
                            {seller.name[0]}
                          </span>
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {seller.name}
                        </div>
                        <div className="text-sm text-gray-500">{seller.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      seller.sellerStatus === 'approved'
                        ? 'bg-success-100 text-success-800'
                        : seller.sellerStatus === 'rejected'
                        ? 'bg-error-100 text-error-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                      {seller.sellerStatus || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(seller.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0 products
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {seller.sellerStatus === 'pending' && (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleStatusChange(seller.id, 'approved')}
                          className="text-success-600 hover:text-success-900"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(seller.id, 'rejected')}
                          className="text-error-600 hover:text-error-900"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                    {seller.sellerStatus === 'approved' && (
                      <button
                        onClick={() => handleStatusChange(seller.id, 'rejected')}
                        className="text-error-600 hover:text-error-900"
                      >
                        Suspend
                      </button>
                    )}
                    {seller.sellerStatus === 'rejected' && (
                      <button
                        onClick={() => handleStatusChange(seller.id, 'approved')}
                        className="text-success-600 hover:text-success-900"
                      >
                        Reinstate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSellers;