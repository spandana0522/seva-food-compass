
import { AlertCircle } from "lucide-react";
import FoodDonationCard from "./FoodDonationCard";

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

interface FoodDonationListProps {
  loading: boolean;
  filteredDonations: FoodDonation[];
  foodTypeLabels: Record<string, string>;
  isInCart: (id: string) => boolean;
  onAddToCart: (donation: FoodDonation) => void;
  onRemoveFromCart: (id: string, name: string) => void;
}

const FoodDonationList = ({
  loading,
  filteredDonations,
  foodTypeLabels,
  isInCart,
  onAddToCart,
  onRemoveFromCart
}: FoodDonationListProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">Loading available food items...</p>
      </div>
    );
  }

  if (filteredDonations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <AlertCircle className="mx-auto text-gray-400 mb-3" size={40} />
        <p className="text-xl text-gray-500">No food items found matching your search.</p>
        <p className="text-gray-500 mt-2">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDonations.map((donation) => (
        <FoodDonationCard
          key={donation.id}
          donation={donation}
          foodTypeLabels={foodTypeLabels}
          isInCart={isInCart}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
    </div>
  );
};

export default FoodDonationList;
