
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedFood = () => {
  const foodItems = [
    {
      id: 1,
      title: "Fresh Vegetables Bundle",
      location: "Downtown, San Francisco",
      distance: "0.8 miles away",
      timeLeft: "Expires in 2 days",
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Vegetarian", "Organic"]
    },
    {
      id: 2,
      title: "Bakery Goods Assortment",
      location: "Mission District, San Francisco",
      distance: "1.2 miles away",
      timeLeft: "Expires today",
      imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Baked Goods", "Vegetarian"]
    },
    {
      id: 3,
      title: "Canned Food Package",
      location: "Richmond District, San Francisco",
      distance: "2.5 miles away",
      timeLeft: "Expires in 30 days",
      imageUrl: "https://images.unsplash.com/photo-1584263074798-6d75c0441f8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Non-perishable", "Family Pack"]
    },
    {
      id: 4,
      title: "Fresh Fruit Basket",
      location: "Sunset District, San Francisco",
      distance: "3.1 miles away",
      timeLeft: "Expires in 4 days",
      imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Organic", "Fresh"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Food Near You</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through recently shared food items available for pickup in your area.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 food-card opacity-0 animate-fade-in ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : index === 3 ? 'delay-3' : ''}`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                  <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                    {item.timeLeft}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.location}</p>
                <p className="text-gray-500 text-sm mb-4">{item.distance}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full border border-gray-200 hover:bg-seva-50 hover:text-seva-600">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/find">
            <Button className="bg-seva-500 hover:bg-seva-600">
              View All Available Food
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFood;
