
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-seva-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </span>
          <span className="font-bold text-xl text-gray-800">Seva<span className="text-seva-500">Compass</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-seva-500 font-medium">
            Home
          </Link>
          <Link to="/donate" className="text-gray-700 hover:text-seva-500 font-medium">
            Donate Food
          </Link>
          <Link to="/find" className="text-gray-700 hover:text-seva-500 font-medium">
            Find Food
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-seva-500 font-medium">
            About Us
          </Link>
          <Link to="/login">
            <Button variant="outline" className="mr-2">Log In</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-seva-500 hover:bg-seva-600">Sign Up</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-4 z-50 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-seva-500 font-medium py-2" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/donate" className="text-gray-700 hover:text-seva-500 font-medium py-2" onClick={toggleMobileMenu}>
              Donate Food
            </Link>
            <Link to="/find" className="text-gray-700 hover:text-seva-500 font-medium py-2" onClick={toggleMobileMenu}>
              Find Food
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-seva-500 font-medium py-2" onClick={toggleMobileMenu}>
              About Us
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={toggleMobileMenu}>
                <Button variant="outline" className="w-full">Log In</Button>
              </Link>
              <Link to="/register" onClick={toggleMobileMenu}>
                <Button className="w-full bg-seva-500 hover:bg-seva-600">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
