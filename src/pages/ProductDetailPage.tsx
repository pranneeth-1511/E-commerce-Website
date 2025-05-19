import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  RefreshCw, 
  Shield,
  Plus,
  Minus,
  ChevronRight
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useToaster } from '../components/ui/Toaster';
import ProductCard from '../components/products/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addToCart } = useCart();
  const { showToast } = useToaster();
  
  // Fetch product data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
      
      // Get related products (same category)
      if (foundProduct) {
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      showToast(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to your cart`, 'success');
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-4">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }
  
  // Create an array of images (in a real app, this would come from the product data)
  // For demo, we'll use the same image multiple times
  const productImages = [
    product.imageUrl,
    product.imageUrl, // In a real app these would be different images
    product.imageUrl,
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <ol className="flex text-sm">
          <li className="flex items-center">
            <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
          </li>
          <li className="flex items-center">
            <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
          </li>
          <li className="flex items-center">
            <Link 
              to={`/products?category=${product.category}`} 
              className="text-gray-500 hover:text-primary-600"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
          </li>
          <li className="text-gray-700 font-medium truncate">{product.title}</li>
        </ol>
      </nav>
      
      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product images */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={productImages[activeImage]} 
              alt={product.title}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                className={`bg-gray-100 rounded-md overflow-hidden border-2 ${
                  activeImage === index ? 'border-primary-500' : 'border-transparent'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={img} 
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-full h-auto object-cover aspect-square"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product info */}
        <div>
          <div className="mb-2">
            <span className="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) 
                      ? 'text-accent-500 fill-current' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-700">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">By {product.sellerName}</span>
          </div>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.stock > 0 ? (
              <span className="ml-2 text-sm text-success-700">In Stock ({product.stock} available)</span>
            ) : (
              <span className="ml-2 text-sm text-error-700">Out of Stock</span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Quantity control */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1 && val <= product.stock) {
                    setQuantity(val);
                  }
                }}
                className="w-16 h-10 border-t border-b border-gray-300 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              type="button"
              className="btn btn-primary flex-1"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              type="button"
              className="btn btn-outline flex-none"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="btn btn-outline flex-none"
              aria-label="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          
          {/* Additional info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="mr-3 bg-primary-100 rounded-full p-2">
                  <Truck className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 bg-primary-100 rounded-full p-2">
                  <RefreshCw className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Easy Returns</h4>
                  <p className="text-xs text-gray-500">30 days return policy</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 bg-primary-100 rounded-full p-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Secure Payments</h4>
                  <p className="text-xs text-gray-500">Protected by encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;