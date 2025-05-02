
import { MapPin, Search, Info, Soup } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const FindFood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Find Food</h1>
          <p className="text-lg text-gray-700 mb-8">
            Access free or affordable food in your neighborhood. Connect with generous donors 
            and local organizations offering food assistance.
          </p>
          
          <div className="bg-seva-50 p-6 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4">Search for Available Food</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text" 
                  placeholder="Enter your location or zip code" 
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-auto">
                <Button className="w-full bg-seva-500 hover:bg-seva-600">
                  Search
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Available Food Near You</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample food cards - in a real app these would be dynamically generated */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Fresh Vegetables</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Available Now</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>2.5 miles away - Downtown</span>
                    </div>
                    <p>Assorted fresh vegetables from local farm, picked this morning.</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-seva-600 font-medium">Posted 1h ago</span>
                      <Button variant="outline" className="text-seva-600 border-seva-500 hover:bg-seva-50">Contact</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Bread & Pastries</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Available Now</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>1.2 miles away - Baker Street</span>
                    </div>
                    <p>End of day fresh bread and pastries from local bakery.</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-seva-600 font-medium">Posted 3h ago</span>
                      <Button variant="outline" className="text-seva-600 border-seva-500 hover:bg-seva-50">Contact</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Canned Goods</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Available Now</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>3.7 miles away - Food Bank</span>
                    </div>
                    <p>Assorted canned goods including beans, vegetables, and soups.</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-seva-600 font-medium">Posted 5h ago</span>
                      <Button variant="outline" className="text-seva-600 border-seva-500 hover:bg-seva-50">Contact</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="text-seva-600 border-seva-500 hover:bg-seva-50">
                Load More Results
              </Button>
            </div>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 p-2 rounded-full mt-1">
                <Info className="text-orange-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Need Immediate Food Assistance?</h3>
                <p className="text-gray-700 mb-4">
                  If you need immediate food assistance, please contact our emergency helpline 
                  or visit the nearest food bank. We're here to help you!
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Soup className="mr-2" size={18} />
                  Get Emergency Assistance
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default FindFood;
