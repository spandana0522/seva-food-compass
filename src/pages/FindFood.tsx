
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SearchIcon, MapPin, Calendar, AlertCircle, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Dummy data for food donations
const dummyFoodData = [
  {
    id: "1",
    food_name: "Fresh Vegetables",
    food_type: "fresh_produce",
    quantity: 5,
    description: "Assortment of fresh vegetables including carrots, tomatoes, and bell peppers.",
    expiry_date: "2025-05-20",
    pickup_location: "Downtown Community Center",
    donor_name: "Green Garden Co-op",
    image_url: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: "2",
    food_name: "Canned Soup",
    food_type: "canned_goods",
    quantity: 12,
    description: "Vegetable and chicken noodle soup cans, all unexpired.",
    expiry_date: "2025-08-15",
    pickup_location: "North Food Pantry",
    donor_name: "Helping Hands Foundation",
    image_url: "https://images.unsplash.com/photo-1604437668913-a54d67565758?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: "3",
    food_name: "Fresh Bread",
    food_type: "baked_goods",
    quantity: 8,
    description: "Freshly baked loaves of sourdough and whole wheat bread.",
    expiry_date: "2025-05-15",
    pickup_location: "Sunrise Bakery",
    donor_name: "Sunrise Bakery",
    image_url: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: "4",
    food_name: "Rice and Pasta",
    food_type: "dry_goods",
    quantity: 10,
    description: "Unopened packages of white rice and various pasta shapes.",
    pickup_location: "East Community Kitchen",
    donor_name: "Food Distribution Network",
    image_url: "https://images.unsplash.com/photo-1605478773650-81c5980ffc4a?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: "5",
    food_name: "Fruit Juice",
    food_type: "beverages",
    quantity: 6,
    description: "Bottles of apple and orange juice.",
    expiry_date: "2025-06-10",
    pickup_location: "Wellness Center",
    donor_name: "Healthy Living Co.",
    image_url: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=300&h=200"
  }
];

type FoodDonation = {
  id: string;
  food_name: string;
  food_type: string;
  quantity: number;
  description?: string;
  expiry_date?: string;
  pickup_location: string;
  donor_name: string;
  image_url?: string;
  reserved?: boolean;
  reserved_by?: string;
};

type Reservation = {
  id: string;
  food_donation_id: string;
  user_id: string;
  status: string;
  created_at: string;
};

const foodTypeOptions = [
  { value: "all", label: "All Types" },
  { value: "fresh_produce", label: "Fresh Produce" },
  { value: "canned_goods", label: "Canned Goods" },
  { value: "baked_goods", label: "Baked Goods" },
  { value: "cooked_meals", label: "Cooked Meals" },
  { value: "beverages", label: "Beverages" },
  { value: "dry_goods", label: "Dry Goods" },
  { value: "other", label: "Other" }
];

const foodTypeLabels: Record<string, string> = {
  fresh_produce: "Fresh Produce",
  canned_goods: "Canned Goods",
  baked_goods: "Baked Goods",
  cooked_meals: "Cooked Meals",
  beverages: "Beverages",
  dry_goods: "Dry Goods",
  other: "Other"
};

const FindFood = () => {
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const { cartItems, addToCart, removeFromCart } = useCart();
  
  // Function to check if an item is in the cart
  const isInCart = (id: string) => {
    return cartItems.some(item => item.id === id);
  };

  useEffect(() => {
    // In a real app, this would fetch from Supabase
    // For now, we'll use the dummy data
    setLoading(true);
    setTimeout(() => {
      setDonations(dummyFoodData);
      setLoading(false);
    }, 800);
  }, []);

  const handleAddToCart = (donation: FoodDonation) => {
    addToCart({
      id: donation.id,
      food_name: donation.food_name,
      quantity: 1,
      donor: donation.donor_name,
      image: donation.image_url
    });
    toast.success(`${donation.food_name} added to cart`);
  };

  const handleRemoveFromCart = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const handleCancelReservation = (id: string) => {
    // In a real app, this would update the database
    toast.success("Reservation cancelled successfully");
    setMyReservations(prev => prev.filter(res => res.id !== id));
  };

  // Filter donations based on search term and type filter
  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.food_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (donation.description && donation.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || donation.food_type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Find Available Food</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Browse food items available for pickup in your community. Reserve what you need
            and arrange pickup with donors.
          </p>
        </section>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text"
              placeholder="Search for food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-lg py-6"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="text-lg py-6">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                {foodTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-lg">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* My Reservations Section */}
        {myReservations.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myReservations.map(reservation => {
                const donation = donations.find(d => d.id === reservation.food_donation_id);
                if (!donation) return null;
                
                return (
                  <Card key={reservation.id}>
                    <CardHeader className="pb-2">
                      <CardTitle>{donation.food_name}</CardTitle>
                      <CardDescription>Reserved on {new Date(reservation.created_at).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <p><MapPin className="inline mr-1" size={16} /> {donation.pickup_location}</p>
                        <p>Quantity: {donation.quantity}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleCancelReservation(reservation.id)}
                      >
                        <X size={16} className="mr-2" />
                        Cancel Reservation
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Available Food Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Available Food Items</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl">Loading available food items...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <AlertCircle className="mx-auto text-gray-400 mb-3" size={40} />
              <p className="text-xl text-gray-500">No food items found matching your search.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonations.map((donation) => (
                <Card key={donation.id} className="overflow-hidden">
                  {donation.image_url && (
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={donation.image_url}
                        alt={donation.food_name}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{donation.food_name}</CardTitle>
                        <CardDescription>{donation.donor_name}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-seva-50 text-seva-700 border-seva-200">
                        {foodTypeLabels[donation.food_type] || donation.food_type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {donation.description && (
                        <p className="text-gray-600">{donation.description}</p>
                      )}
                      <div className="space-y-1 text-gray-600">
                        <p className="flex items-center gap-2">
                          <MapPin size={16} className="text-seva-500" />
                          {donation.pickup_location}
                        </p>
                        {donation.expiry_date && (
                          <p className="flex items-center gap-2">
                            <Calendar size={16} className="text-seva-500" />
                            Expires: {new Date(donation.expiry_date).toLocaleDateString()}
                          </p>
                        )}
                        <p>Quantity available: {donation.quantity}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isInCart(donation.id) ? (
                      <Button 
                        variant="outline" 
                        className="w-full border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleRemoveFromCart(donation.id, donation.food_name)}
                      >
                        <X size={18} className="mr-2" />
                        Remove from Cart
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-seva-500 hover:bg-seva-600"
                        onClick={() => handleAddToCart(donation)}
                      >
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default FindFood;
