
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center px-4">
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-seva-100 flex items-center justify-center">
              <span className="text-6xl text-seva-500">404</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Oops! We couldn't find the page you're looking for.
          </p>
          <Link to="/">
            <Button className="bg-seva-500 hover:bg-seva-600">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
