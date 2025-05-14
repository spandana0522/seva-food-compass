
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Available Food Near You</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse free food items available for pickup in your area.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 food-card opacity-0 animate-fade-in ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : index === 3 ? 'delay-3' : ''}`}
            >
              <div className="relative">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <div className="absolute top-0 right-0 mt-3 mr-3">
                  <span className="text-xs font-bold text-white bg-green-500 px-3 py-1 rounded-full">
                    {item.timeLeft}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-1 flex items-center">
                  <span className="mr-1">📍</span> {item.location}
                </p>
                <p className="text-gray-500 mb-4">{item.distance}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link to="/find">
                  <Button variant="outline" className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 text-lg">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/find">
            <Button className="bg-green-500 hover:bg-green-600 text-lg px-8 py-6">
              See All Available Food
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFood;
