import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useToaster } from '../ui/Toaster';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToaster();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.title} to your cart`, 'success');
  };
  
  return (
    <Link 
      to={`/products/${product.id}`}
      className="card group relative flex flex-col overflow-hidden"
    >
      {/* Image container with overlay */}
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-primary-50 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className="h-5 w-5 text-gray-700" />
          </button>
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-primary-50 transition-colors"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center mb-1">
          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">{product.title}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-accent-500 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500">By {product.sellerName}</span>
        </div>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className="btn-primary text-xs py-1.5 px-3 flex items-center"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;