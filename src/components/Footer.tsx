
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-8 w-8 rounded-full bg-seva-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </span>
              <span className="font-bold text-xl text-gray-800">Anna<span className="text-seva-500">purna</span></span>
            </div>
            <p className="text-gray-600 mb-4">Connecting food donors with those in need, reducing waste and fighting hunger in our communities.</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-seva-500">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-seva-500">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-seva-500">
                <Twitter size={20} />
              </a>
              <a href="mailto:contact@annapurna.org" aria-label="Email" className="text-gray-600 hover:text-seva-500">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-seva-500">Home</Link></li>
              <li><Link to="/donate" className="text-gray-600 hover:text-seva-500">Donate Food</Link></li>
              <li><Link to="/find" className="text-gray-600 hover:text-seva-500">Find Food</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-seva-500">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-seva-500">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seva-500">Food Safety Guidelines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seva-500">Community Stories</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seva-500">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">contact@annapurna.org</li>
              <li className="text-gray-600">+1 (555) 123-4567</li>
              <li className="text-gray-600">123 Sharing Street, Kindness City, CA 94123</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Annapurna. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-seva-500 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-seva-500 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-seva-500 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
