
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, Home, Apple, Search, Info, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext"; // We'll create this context

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-seva-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </span>
          <span className="font-bold text-xl text-gray-800">Anna<span className="text-seva-500">purna</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-seva-500 font-medium flex items-center gap-2">
            <Home size={20} className="text-seva-500" aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link to="/donate-info" className="text-gray-700 hover:text-seva-500 font-medium flex items-center gap-2">
            <Apple size={20} className="text-seva-500" aria-hidden="true" />
            <span>Donate Food</span>
          </Link>
          <Link to="/find" className="text-gray-700 hover:text-seva-500 font-medium flex items-center gap-2">
            <Search size={20} className="text-seva-500" aria-hidden="true" />
            <span>Find Food</span>
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-seva-500 font-medium flex items-center gap-2">
            <Info size={20} className="text-seva-500" aria-hidden="true" />
            <span>About Us</span>
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-seva-500 font-medium flex items-center gap-2 relative">
            <ShoppingCart size={20} className="text-seva-500" aria-hidden="true" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={18} className="text-seva-500" />
                <span className="text-gray-700">
                  {user.email?.split('@')[0]}
                </span>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => signOut()}
              >
                <LogOut size={18} />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="mr-2">Log In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-seva-500 hover:bg-seva-600">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart" className="relative mr-2">
            <ShoppingCart size={22} className="text-gray-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button 
            className="text-gray-700"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-4 z-50 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-seva-500 font-medium py-2 flex items-center gap-2" onClick={toggleMobileMenu}>
              <Home size={20} className="text-seva-500" aria-hidden="true" />
              <span>Home</span>
            </Link>
            <Link to="/donate-info" className="text-gray-700 hover:text-seva-500 font-medium py-2 flex items-center gap-2" onClick={toggleMobileMenu}>
              <Apple size={20} className="text-seva-500" aria-hidden="true" />
              <span>Donate Food</span>
            </Link>
            <Link to="/find" className="text-gray-700 hover:text-seva-500 font-medium py-2 flex items-center gap-2" onClick={toggleMobileMenu}>
              <Search size={20} className="text-seva-500" aria-hidden="true" />
              <span>Find Food</span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-seva-500 font-medium py-2 flex items-center gap-2" onClick={toggleMobileMenu}>
              <Info size={20} className="text-seva-500" aria-hidden="true" />
              <span>About Us</span>
            </Link>
            
            {user ? (
              <div className="flex flex-col space-y-2 pt-2">
                <div className="flex items-center gap-2 py-2">
                  <User size={18} className="text-seva-500" />
                  <span className="text-gray-700">
                    {user.email?.split('@')[0]}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    signOut();
                    toggleMobileMenu();
                  }}
                >
                  <LogOut size={18} />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/login" onClick={toggleMobileMenu}>
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link to="/register" onClick={toggleMobileMenu}>
                  <Button className="w-full bg-seva-500 hover:bg-seva-600">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
