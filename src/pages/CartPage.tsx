
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ShoppingCart, Trash, Plus, Minus, Info } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReservation = () => {
    if (!user) {
      toast.error("Please log in to reserve food items");
      navigate("/login");
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      toast.success("Items reserved successfully! The donors will be notified.");
      clearCart();
      setIsProcessing(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <ShoppingCart className="text-seva-500" />
              Your Food Cart
            </h1>
            {cartItems.length > 0 && (
              <Button 
                variant="outline" 
                className="text-red-500 border-red-300 hover:bg-red-50"
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared");
                }}
              >
                <Trash size={18} className="mr-2" />
                Clear Cart
              </Button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <Card className="text-center p-12">
              <CardContent className="pt-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ShoppingCart size={36} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6 text-lg">
                  Browse available food items and add some to your cart.
                </p>
                <Button 
                  className="bg-seva-500 hover:bg-seva-600 text-lg px-6 py-6"
                  onClick={() => navigate("/find")}
                >
                  Browse Available Food
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <Info className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-blue-700 font-medium">Reservation Information</h3>
                  <p className="text-blue-600">
                    When you reserve items, donors will be notified. Coordinate pickup times directly with them.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Items ({cartItems.length})</h2>
                
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-grow">
                        <h3 className="text-xl font-medium">{item.food_name}</h3>
                        {item.donor && (
                          <p className="text-gray-500">Donated by: {item.donor}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus size={16} />
                        </Button>
                        
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center h-8"
                        />
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus size={16} />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.success(`${item.food_name} removed from cart`);
                          }}
                          className="text-red-500 h-8 w-8"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <Button 
                  className="w-full bg-seva-500 hover:bg-seva-600 text-lg py-6"
                  disabled={isProcessing}
                  onClick={handleReservation}
                >
                  {isProcessing ? "Processing..." : "Reserve These Items"}
                </Button>
                <p className="text-center mt-4 text-gray-500">
                  By reserving, you agree to pick up these items promptly
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
