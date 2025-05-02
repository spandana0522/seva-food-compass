
import { Utensils, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const DonateFood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Donate Food</h1>
          <p className="text-lg text-gray-700 mb-8">
            Help feed those in need by donating unused food items. Your contribution 
            makes a significant difference in combating food waste and hunger in our community.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>Simple steps to donate your food</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-seva-100 p-2 rounded-full">
                    <Utensils className="text-seva-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">List Your Food</h3>
                    <p className="text-gray-600">Add details about the food you wish to donate including quantity, expiry date, and pick-up instructions.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-seva-100 p-2 rounded-full">
                    <MapPin className="text-seva-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Arrange Pick-Up</h3>
                    <p className="text-gray-600">Specify your location and available time slots for the food to be collected.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-seva-100 p-2 rounded-full">
                    <Calendar className="text-seva-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Schedule Confirmed</h3>
                    <p className="text-gray-600">Receive confirmation once someone has agreed to pick up your donation.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-seva-500 hover:bg-seva-600">Donate Now</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Guidelines for Donation</CardTitle>
                <CardDescription>What food can you donate?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Acceptable Items</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Unopened packaged foods within expiry date</li>
                    <li>Fresh fruits and vegetables</li>
                    <li>Canned goods and non-perishables</li>
                    <li>Baked goods (within 24 hours of baking)</li>
                    <li>Sealed beverages</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Not Acceptable</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Expired food items</li>
                    <li>Opened packages</li>
                    <li>Food with signs of spoilage</li>
                    <li>Homemade items without proper labeling</li>
                    <li>Alcohol or items requiring refrigeration for over 2 hours</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">For any questions about donations, please contact our support team.</p>
              </CardFooter>
            </Card>
          </div>
          
          <div className="bg-seva-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="mb-6">Join our community of food donors and help reduce waste while feeding those in need.</p>
            <Button className="bg-seva-500 hover:bg-seva-600">Start Donating</Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DonateFood;
