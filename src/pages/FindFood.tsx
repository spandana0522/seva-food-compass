
import { useState, useEffect } from "react";
import { MapPin, Search, Info, Soup, Filter, Calendar, Clock } from "lucide-react";
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
  const itemsPerPage = 6;

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
    
    toast.success(`Contact request sent for ${item.food_name}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto flex-grow px-4 py-8">
        {/* Premium Hero Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-seva-500 to-purple-600 rounded-xl p-8 md:p-12 shadow-lg text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Available Food</h1>
            <p className="text-lg opacity-90 max-w-3xl mb-6">
              Connect with generous donors in your community offering fresh, nutritious food. 
              Search by location, food type, and more to find what you need.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search food items" 
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Enter location or zip code" 
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div>
                  <Select value={foodType} onValueChange={setFoodType}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="All food types" />
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
              
              <div className="flex justify-end mt-4">
                <Button onClick={() => refetch()} className="bg-white text-purple-600 hover:bg-white/90">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Results Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {isLoading ? "Searching..." : `${foodItems.length} Results Found`}
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  onClick={() => setViewMode("grid")}
                  className="rounded-none border-0"
                  size="sm"
                >
                  Grid
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  onClick={() => setViewMode("list")}
                  className="rounded-none border-0"
                  size="sm"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-seva-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              An error occurred while loading food items. Please try again.
            </div>
          ) : foodItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Info className="text-gray-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">No food items found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any food items matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setLocation("");
                setFoodType("all");
                refetch();
              }} variant="outline">
                Reset Search
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="h-3 bg-seva-500"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="line-clamp-1">{item.food_name}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {item.quantity} {item.quantity === 1 ? "item" : "items"} available
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={16} />
                          <span className="line-clamp-1">{item.pickup_location}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex flex-col">
                            <span className="text-gray-500 flex items-center gap-1 mb-1">
                              <Calendar size={14} />Food Type
                            </span>
                            <span className="font-medium">{getFoodTypeLabel(item.food_type)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 flex items-center gap-1 mb-1">
                              <Clock size={14} />Expires
                            </span>
                            <span className="font-medium">{formatDate(item.expiry_date)}</span>
                          </div>
                        </div>
                        
                        {item.description && (
                          <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
                        )}
                        
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm text-seva-600 font-medium">{getTimeSince(item.created_at)}</span>
                          <Button 
                            variant="outline" 
                            className="text-seva-600 border-seva-500 hover:bg-seva-50"
                            onClick={() => handleContact(item)}
                          >
                            Contact
                          </Button>
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
                    <TableHead>Food Item</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.food_name}</TableCell>
                      <TableCell>{getFoodTypeLabel(item.food_type)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{item.pickup_location}</TableCell>
                      <TableCell>{formatDate(item.expiry_date)}</TableCell>
                      <TableCell>{getTimeSince(item.created_at)}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="text-seva-600 border-seva-500 hover:bg-seva-50"
                          onClick={() => handleContact(item)}
                        >
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
        
        {/* Emergency Food Assistance Section */}
        <section className="mb-12">
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="bg-orange-100 p-3 rounded-full mt-1">
                <Info className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Need Immediate Food Assistance?</h3>
                <p className="text-gray-700 mb-4 max-w-3xl">
                  If you need immediate food assistance, please contact our emergency helpline 
                  or visit the nearest food bank. We're here to help you connect with resources
                  in your community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Soup className="mr-2" size={18} />
                    Get Emergency Assistance
                  </Button>
                  <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                    Find Food Banks Near You
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
