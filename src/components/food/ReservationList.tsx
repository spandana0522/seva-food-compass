
import ReservationCard from "./ReservationCard";

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

interface ReservationListProps {
  reservations: Reservation[];
  donations: FoodDonation[];
  onCancelReservation: (id: string) => void;
}

const ReservationList = ({ reservations, donations, onCancelReservation }: ReservationListProps) => {
  if (reservations.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map(reservation => {
          const donation = donations.find(d => d.id === reservation.food_donation_id);
          if (!donation) return null;
          
          return (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              donation={donation}
              onCancelReservation={onCancelReservation}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ReservationList;
