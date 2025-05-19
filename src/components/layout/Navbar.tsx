import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Store, 
  LogOut,
  ShoppingBag,
  LayoutDashboard
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold">ShopTrade</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                  }`
                }
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/products" 
                className={({isActive}) => 
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                  }`
                }
              >
                Products
              </NavLink>
              {user?.role === 'seller' && (
                <NavLink 
                  to="/seller" 
                  className={({isActive}) => 
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                    }`
                  }
                >
                  Seller Dashboard
                </NavLink>
              )}
            </div>
          </div>
          
          {/* Right Menu: Search, Cart, User */}
          <div className="flex items-center space-x-4">
            <button 
              aria-label="Search" 
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
              onClick={() => navigate('/products')}
            >
              <Search className="h-5 w-5" />
            </button>
            
            <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full" 
                      />
                    ) : (
                      <User className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    {user?.role === 'seller' && (
                      <Link
                        to="/seller"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Seller Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Sign in
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="space-y-1 px-4 pt-2 pb-3">
            <NavLink
              to="/"
              className={({isActive}) => 
                `block py-2 text-base font-medium ${
                  isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({isActive}) => 
                `block py-2 text-base font-medium ${
                  isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </NavLink>
            {user?.role === 'seller' && (
              <NavLink
                to="/seller"
                className={({isActive}) => 
                  `block py-2 text-base font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Seller Dashboard
              </NavLink>
            )}
            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;