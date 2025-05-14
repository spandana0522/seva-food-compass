
import { useState, useEffect } from "react";
import { MapPin, Search, Info, Soup, Filter, Calendar, Clock, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Define types for our food data
interface FoodItem {
  id: string;
  food_name: string;
  food_type: string;
  description: string | null;
  expiry_date: string | null;
  pickup_location: string;
  pickup_instructions: string | null;
  quantity: number;
  created_at: string;
  is_available: boolean;
  user_id: string;
}

const FindFood = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [foodType, setFoodType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeRequests, setActiveRequests] = useState<string[]>([]);
  const itemsPerPage = 6;

  // Load active requests from local storage on component mount
  useEffect(() => {
    const savedRequests = localStorage.getItem("activeRequests");
    if (savedRequests) {
      setActiveRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Save active requests to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("activeRequests", JSON.stringify(activeRequests));
  }, [activeRequests]);

  // Fetch food data with React Query
  const { data: foodItems = [], isLoading, error, refetch } = useQuery({
    queryKey: ["foodDonations", foodType, searchTerm, location],
    queryFn: async () => {
      let query = supabase.from("food_donations").select("*").eq("is_available", true);
      
      if (foodType !== "all") {
        query = query.eq("food_type", foodType);
      }
      
      if (searchTerm) {
        query = query.ilike("food_name", `%${searchTerm}%`);
      }
      
      if (location) {
        query = query.ilike("pickup_location", `%${location}%`);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as FoodItem[];
    },
  });

  // Calculate pagination
  const totalPages = Math.ceil((foodItems?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = foodItems.slice(startIndex, startIndex + itemsPerPage);

  // Format date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "No expiration";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate time since posted
  const getTimeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  // Get food type label
  const getFoodTypeLabel = (value: string): string => {
    const types: Record<string, string> = {
      fresh_produce: "Fresh Produce",
      canned_goods: "Canned Goods",
      baked_goods: "Baked Goods",
      cooked_meals: "Cooked Meals",
      beverages: "Beverages",
      dry_goods: "Dry Goods",
      other: "Other",
    };
    return types[value] || value;
  };

  // Handle contact for food item
  const handleContact = (item: FoodItem) => {
    if (!user) {
      toast.error("Please sign in to contact the donor");
      return;
    }
    
    setActiveRequests([...activeRequests, item.id]);
    toast.success(`Contact request sent for ${item.food_name}`);
  };

  // Cancel contact request
  const handleCancelRequest = (itemId: string) => {
    setActiveRequests(activeRequests.filter(id => id !== itemId));
    toast.success("Request cancelled successfully");
  };

  // Clear search fields
  const clearSearch = () => {
    setSearchTerm("");
    setLocation("");
    setFoodType("all");
    refetch();
  };

  // Check if item is in active requests
  const isActiveRequest = (itemId: string) => {
    return activeRequests.includes(itemId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto flex-grow px-4 py-8">
        {/* Page Title - Simplified for better readability */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 md:p-10 shadow-lg text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Find Food Near You</h1>
            <p className="text-lg opacity-90 max-w-3xl mb-6">
              Search below to find available food in your community.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search for food items" 
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                      onClick={() => setSearchTerm("")}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Enter your location" 
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {location && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                      onClick={() => setLocation("")}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                <div>
                  <Select value={foodType} onValueChange={setFoodType}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white text-lg">
                      <SelectValue placeholder="Type of food" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All food types</SelectItem>
                      <SelectItem value="fresh_produce">Fresh Produce</SelectItem>
                      <SelectItem value="canned_goods">Canned Goods</SelectItem>
                      <SelectItem value="baked_goods">Baked Goods</SelectItem>
                      <SelectItem value="cooked_meals">Cooked Meals</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                      <SelectItem value="dry_goods">Dry Goods</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button onClick={clearSearch} variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                  <X size={16} className="mr-1" /> Clear
                </Button>
                <Button onClick={() => refetch()} className="bg-white text-blue-600 hover:bg-white/90 text-lg px-6">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Active Requests Section (New) */}
        {activeRequests.length > 0 && (
          <section className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-3">Your Active Food Requests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {foodItems
                  .filter(item => activeRequests.includes(item.id))
                  .map(item => (
                    <div key={`request-${item.id}`} className="bg-white rounded-lg border border-blue-100 p-4 shadow-sm flex justify-between items-center">
                      <div>
                        <p className="font-medium text-lg">{item.food_name}</p>
                        <p className="text-gray-600">{item.pickup_location}</p>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleCancelRequest(item.id)}
                      >
                        Cancel Request
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Results Section - Simplified UI */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">
              {isLoading ? "Searching..." : `${foodItems.length} Available Food Items`}
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  onClick={() => setViewMode("grid")}
                  className="rounded-none border-0"
                  size="sm"
                >
                  Grid View
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  onClick={() => setViewMode("list")}
                  className="rounded-none border-0"
                  size="sm"
                >
                  List View
                </Button>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              <p className="ml-3 text-lg">Finding food near you...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center">
              <p className="text-lg">Sorry, we couldn't load the food items.</p>
              <Button onClick={() => refetch()} className="mt-3">
                Try Again
              </Button>
            </div>
          ) : foodItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Info className="text-gray-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">No food items found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto text-lg">
                We couldn't find any food items matching your search. Try changing your search or check back later.
              </p>
              <Button onClick={clearSearch} variant="outline" size="lg" className="text-lg px-6">
                Reset Search
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-2">
                    <div className="h-3 bg-green-500"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="line-clamp-1 text-xl">{item.food_name}</span>
                        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                          {item.quantity} {item.quantity === 1 ? "item" : "items"}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600 text-lg">
                          <MapPin size={18} />
                          <span className="line-clamp-1">{item.pickup_location}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-gray-500 flex items-center gap-1 mb-1 text-sm">
                              <Calendar size={14} />Type of Food
                            </span>
                            <span className="font-medium">{getFoodTypeLabel(item.food_type)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 flex items-center gap-1 mb-1 text-sm">
                              <Clock size={14} />Available Until
                            </span>
                            <span className="font-medium">{formatDate(item.expiry_date)}</span>
                          </div>
                        </div>
                        
                        {item.description && (
                          <p className="text-gray-700 line-clamp-2">{item.description}</p>
                        )}
                        
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-gray-600">{getTimeSince(item.created_at)}</span>
                          
                          {isActiveRequest(item.id) ? (
                            <Button 
                              variant="destructive" 
                              className="text-white"
                              onClick={() => handleCancelRequest(item.id)}
                            >
                              Cancel Request
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              className="text-green-600 border-green-500 hover:bg-green-50 text-lg"
                              onClick={() => handleContact(item)}
                            >
                              Request Food
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="mb-8 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-lg">Food Item</TableHead>
                    <TableHead className="text-lg">Type</TableHead>
                    <TableHead className="text-lg">Quantity</TableHead>
                    <TableHead className="text-lg">Location</TableHead>
                    <TableHead className="text-lg">Available Until</TableHead>
                    <TableHead className="text-lg">Posted</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-lg">{item.food_name}</TableCell>
                      <TableCell>{getFoodTypeLabel(item.food_type)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{item.pickup_location}</TableCell>
                      <TableCell>{formatDate(item.expiry_date)}</TableCell>
                      <TableCell>{getTimeSince(item.created_at)}</TableCell>
                      <TableCell>
                        {isActiveRequest(item.id) ? (
                          <Button 
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancelRequest(item.id)}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="text-green-600 border-green-500 hover:bg-green-50"
                            onClick={() => handleContact(item)}
                          >
                            Request
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Pagination - Simplified */}
          {totalPages > 1 && (
            <Pagination className="justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  >
                    Previous Page
                  </PaginationPrevious>
                </PaginationItem>
                
                {/* Show current page of total */}
                <PaginationItem>
                  <span className="px-4 py-2 text-lg">
                    Page {currentPage} of {totalPages}
                  </span>
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  >
                    Next Page
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
        
        {/* Emergency Food Assistance Section - Simplified */}
        <section className="mb-12">
          <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="bg-orange-100 p-3 rounded-full mt-1">
                <Info className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Need Help Right Away?</h3>
                <p className="text-gray-700 mb-4 max-w-3xl text-lg">
                  If you need immediate food help, please call our helpline or find a food bank near you. 
                  We're here to help connect you with resources in your community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-lg">
                    <Soup className="mr-2" size={18} />
                    Get Emergency Help
                  </Button>
                  <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 text-lg">
                    Find Food Banks
                  </Button>
                </div>
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
