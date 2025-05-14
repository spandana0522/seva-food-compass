
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, MapPin, Calendar } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FoodDonation {
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
}

interface FoodDonationCardProps {
  donation: FoodDonation;
  foodTypeLabels: Record<string, string>;
  isInCart: (id: string) => boolean;
  onAddToCart: (donation: FoodDonation) => void;
  onRemoveFromCart: (id: string, name: string) => void;
}

const FoodDonationCard = ({ 
  donation, 
  foodTypeLabels, 
  isInCart, 
  onAddToCart, 
  onRemoveFromCart 
}: FoodDonationCardProps) => {
  return (
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
            onClick={() => onRemoveFromCart(donation.id, donation.food_name)}
          >
            <X size={18} className="mr-2" />
            Remove from Cart
          </Button>
        ) : (
          <Button 
            className="w-full bg-seva-500 hover:bg-seva-600"
            onClick={() => onAddToCart(donation)}
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FoodDonationCard;
