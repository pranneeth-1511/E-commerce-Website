import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft, Trash2 } from 'lucide-react';
import { mockProducts, categories } from '../../data/mockData';
import { Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // Load product data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API fetch
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Set form values
        setTitle(foundProduct.title);
        setDescription(foundProduct.description);
        setPrice(foundProduct.price.toString());
        setCategory(foundProduct.category);
        setStock(foundProduct.stock.toString());
        setImageUrl(foundProduct.imageUrl);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would upload the file to a storage service and get back a URL
    if (e.target.files && e.target.files[0]) {
      // For demo purposes, we'll keep the existing image
      // In a real app, you would upload and get a new URL
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !price || !category || !stock || !imageUrl) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to update the product
    setTimeout(() => {
      // In a real app, this would update the product in the database
      
      setIsSubmitting(false);
      navigate('/seller');
    }, 1000);
  };
  
  // Handle product not found or unauthorized access
  if (!loading && (!product || product.sellerId !== user?.id)) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {!product ? 'Product not found' : 'Unauthorized access'}
        </h2>
        <p className="mb-4">
          {!product 
            ? 'The product you\'re looking for doesn\'t exist or has been removed.' 
            : 'You don\'t have permission to edit this product.'}
        </p>
        <button
          onClick={() => navigate('/seller')}
          className="btn btn-primary"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        onClick={() => navigate('/seller')}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </button>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Product Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {imageUrl ? (
                    <div className="relative w-full">
                      <img 
                        src={imageUrl}
                        alt="Product preview"
                        className="mx-auto h-48 w-auto object-contain"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md"
                        onClick={() => setImageUrl('')}
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              {/* Product Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  className="input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="input"
                    min="0.01"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    className="input"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {/* Submit and Delete Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    'Update Product'
                  )}
                </button>
                <button
                  type="button"
                  className="btn bg-error-600 hover:bg-error-700 text-white flex items-center justify-center"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;