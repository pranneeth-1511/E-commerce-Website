import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { mockProducts, categories } from '../data/mockData';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Get filter values from URL params
  const initialCategory = queryParams.get('category') || 'All';
  const initialSort = queryParams.get('sort') || 'newest';
  const initialSearch = queryParams.get('search') || '';
  
  // State for products and filters
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState(initialSort);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    }
    
    if (sortOption !== 'newest') {
      params.set('sort', sortOption);
    }
    
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    }, { replace: true });
    
  }, [selectedCategory, sortOption, searchTerm, navigate, location.pathname]);
  
  // Apply filters
  useEffect(() => {
    let result = [...mockProducts];
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortOption) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Assuming createdAt is a date string
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOption, searchTerm, priceRange]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };
  
  const clearFilters = () => {
    setSelectedCategory('All');
    setSortOption('newest');
    setSearchTerm('');
    setPriceRange([0, 500]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      
      {/* Search and filter controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search input */}
          <form 
            onSubmit={handleSearchSubmit}
            className="relative flex-grow"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </form>
          
          {/* Sort dropdown */}
          <div className="relative">
            <label htmlFor="sort-by" className="sr-only">Sort by</label>
            <select
              id="sort-by"
              className="input appearance-none pr-10 min-w-[200px]"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Mobile filter button */}
          <button
            className="md:hidden btn btn-outline flex items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
        
        {/* Filter badges */}
        {(selectedCategory !== 'All' || searchTerm || sortOption !== 'newest') && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategory !== 'All' && (
              <span className="badge bg-primary-100 text-primary-800 flex items-center">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="ml-1 hover:text-primary-600"
                  aria-label={`Remove ${selectedCategory} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="badge bg-primary-100 text-primary-800 flex items-center">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-1 hover:text-primary-600"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {sortOption !== 'newest' && (
              <span className="badge bg-primary-100 text-primary-800 flex items-center">
                Sort: {sortOption === 'priceLow' ? 'Price (Low to High)' : 
                       sortOption === 'priceHigh' ? 'Price (High to Low)' : 
                       'Most Popular'}
                <button
                  onClick={() => setSortOption('newest')}
                  className="ml-1 hover:text-primary-600"
                  aria-label="Clear sort"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters - desktop */}
        <div className={`md:w-1/4 lg:w-1/5 bg-white p-6 rounded-lg shadow-sm h-fit
                        ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsFilterOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Category filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price range filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">${priceRange[0]}</span>
                <span className="text-sm text-gray-500">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= priceRange[1]) {
                      setPriceRange([value, priceRange[1]]);
                    }
                  }}
                  className="input w-1/2 py-1 text-sm"
                />
                <input
                  type="number"
                  min={priceRange[0]}
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= priceRange[0] && value <= 500) {
                      setPriceRange([priceRange[0], value]);
                    }
                  }}
                  className="input w-1/2 py-1 text-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Apply/Reset buttons for mobile */}
          <div className="md:hidden flex gap-2">
            <button
              className="btn btn-outline flex-1"
              onClick={clearFilters}
            >
              Reset
            </button>
            <button
              className="btn btn-primary flex-1"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply
            </button>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try changing your search criteria or browse all products.</p>
              <button
                onClick={clearFilters}
                className="btn btn-primary"
              >
                View All Products
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">{filteredProducts.length} products found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;