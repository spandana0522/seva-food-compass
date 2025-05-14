
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, X } from "lucide-react";

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

interface Reservation {
  id: string;
  food_donation_id: string;
  user_id: string;
  status: string;
  created_at: string;
}

interface ReservationCardProps {
  reservation: Reservation;
  donation: FoodDonation;
  onCancelReservation: (id: string) => void;
}

const ReservationCard = ({ reservation, donation, onCancelReservation }: ReservationCardProps) => {
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
          onClick={() => onCancelReservation(reservation.id)}
        >
          <X size={16} className="mr-2" />
          Cancel Reservation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReservationCard;
