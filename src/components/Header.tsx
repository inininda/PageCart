import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, BookOpen, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useState, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const { getTotalItems, toggleCart } = useCartStore();
  const { user, isAuthenticated, signOut, checkAuth } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">PageCart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              to="/books" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              All Books
            </Link>
            <Link 
              to="/books?category=Fiction" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Fiction
            </Link>
            <Link 
              to="/books?category=Non-Fiction" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Non-Fiction
            </Link>
            <Link 
              to="/books?bestseller=true" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Bestsellers
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search books..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Auth, Cart and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Authentication Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.fullName || user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    signOut();
                    navigate('/');
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/signin')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="flex mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search books..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              
              {/* Mobile Authentication */}
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 pb-4 border-b">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user?.fullName || user?.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      signOut();
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pb-4 border-b">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      navigate('/signin');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      navigate('/signup');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              <Link 
                to="/" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/books" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Books
              </Link>
              <Link 
                to="/books?category=Fiction" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fiction
              </Link>
              <Link 
                to="/books?category=Non-Fiction" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Non-Fiction
              </Link>
              <Link 
                to="/books?bestseller=true" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bestsellers
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
