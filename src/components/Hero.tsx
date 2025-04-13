
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="hero-gradient py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center opacity-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Share Food, <span className="text-seva-500">Share Love</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
              Connect with your community by sharing excess food with those who need it most. Join our mission to reduce food waste and fight hunger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/donate">
                <Button className="bg-seva-500 hover:bg-seva-600 px-6 py-6 text-lg">
                  Donate Food
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/find">
                <Button variant="outline" className="px-6 py-6 text-lg">
                  Find Food
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white">
                  <span className="text-orange-500 text-sm font-medium">KL</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-seva-100 flex items-center justify-center border-2 border-white">
                  <span className="text-seva-500 text-sm font-medium">MP</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white">
                  <span className="text-blue-500 text-sm font-medium">JD</span>
                </div>
              </div>
              <p className="text-gray-600">
                Joined by <span className="font-semibold">1,200+</span> generous donors
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center opacity-0 animate-fade-in delay-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="People sharing food" 
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-seva-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-seva-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">5,000+</p>
                    <p className="text-sm text-gray-600">Meals Shared</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
