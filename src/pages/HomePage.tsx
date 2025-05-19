import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  TrendingUp, 
  Shield, 
  Truck, 
  CreditCard,
  ChevronRight 
} from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { mockProducts, categories } from '../data/mockData';

const HomePage: React.FC = () => {
  // Get featured products (first 4)
  const featuredProducts = mockProducts.slice(0, 4);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Your One-Stop <br />
              Shopping Destination
            </h1>
            <p className="text-lg md:text-xl mb-6 text-primary-100">
              Join our community of buyers and sellers to experience a seamless shopping journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn bg-white text-primary-700 hover:bg-primary-50">
                Shop Now
              </Link>
              <Link to="/register" className="btn bg-primary-700 text-white border border-primary-400 hover:bg-primary-800">
                Become a Seller
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Online Shopping" 
              className="rounded-lg shadow-xl max-w-full h-auto object-cover"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category, index) => (
              <Link 
                key={index}
                to={`/products?category=${category}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
                    <ShoppingBag className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Curated selection of high-quality products from trusted sellers.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Totally secure checkout process with multiple payment options.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your doorstep.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">Simple and hassle-free return policy for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-accent-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Start Selling Today</h2>
            <p className="text-lg mb-6">
              Join thousands of sellers who have boosted their business with ShopTrade.
              Register now to start listing your products.
            </p>
            <Link to="/register" className="btn bg-white text-accent-600 hover:bg-accent-50">
              Register as Seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;