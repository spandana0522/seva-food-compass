
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Apple, MapPin, Calendar } from "lucide-react";

const DonateInfo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Donate Food</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Share your excess food with those in need. Together we can reduce food waste and 
            fight hunger in our community.
          </p>
        </div>

        <div className="bg-seva-100 rounded-xl p-6 mb-10">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Apple size={32} className="text-seva-600" />
              </div>
              <h3 className="text-xl font-semibold">List Food Items</h3>
              <p className="text-lg">Share details about the food you wish to donate</p>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <MapPin size={32} className="text-seva-600" />
              </div>
              <h3 className="text-xl font-semibold">Arrange Pick-Up</h3>
              <p className="text-lg">Specify where and when the food can be collected</p>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Calendar size={32} className="text-seva-600" />
              </div>
              <h3 className="text-xl font-semibold">Receive Confirmation</h3>
              <p className="text-lg">Get notified when someone claims your donation</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Guidelines for Donation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
              <div>
                <h3 className="font-semibold text-xl">Acceptable Items</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Unopened packaged foods within expiry date</li>
                  <li>Fresh fruits and vegetables</li>
                  <li>Canned goods and non-perishables</li>
                  <li>Baked goods (within 24 hours of baking)</li>
                  <li>Sealed beverages</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl">Not Acceptable</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Expired food items</li>
                  <li>Opened packages</li>
                  <li>Food with signs of spoilage</li>
                  <li>Homemade items without proper labeling</li>
                  <li>Alcohol or items requiring refrigeration for over 2 hours</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Donation Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
              <p>
                Your food donations make a real difference in our community:
              </p>
              
              <ul className="list-disc pl-5 space-y-1">
                <li>Help feed families facing food insecurity</li>
                <li>Reduce food waste in landfills</li>
                <li>Support environmental sustainability</li>
                <li>Build stronger community connections</li>
                <li>Provide nutrition to those who need it most</li>
              </ul>
              
              <div className="mt-6">
                <Link to="/donate">
                  <Button size="lg" className="w-full text-lg bg-seva-500 hover:bg-seva-600 py-6">
                    Continue to Donation Form
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Have questions about making a donation? Contact our support team at <span className="font-medium">support@annapurna.org</span>
          </p>
          
          <Link to="/donate">
            <Button size="lg" className="bg-seva-500 hover:bg-seva-600 text-xl px-8 py-7">
              Start Your Donation Now
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonateInfo;
