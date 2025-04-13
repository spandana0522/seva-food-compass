
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Seva Food Compass has allowed our restaurant to put excess food to good use instead of throwing it away. It feels great to know we're helping our community.",
      author: "Michael Chen",
      role: "Restaurant Owner",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      quote: "As a single mother of three, finding affordable food can be challenging. This platform has been a blessing for my family during tough times.",
      author: "Sarah Johnson",
      role: "Recipient",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      quote: "I've been volunteering with food banks for years, and Seva Food Compass has revolutionized how we connect donors with those in need. The technology makes everything so much more efficient.",
      author: "David Rodriguez",
      role: "Volunteer Coordinator",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-seva-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stories from donors and recipients who are making a difference.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
              <button 
                onClick={prevTestimonial}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-seva-500 focus:ring-opacity-50"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-md opacity-0 animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Quote className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              
              <blockquote className="text-center mb-8">
                <p className="text-xl text-gray-700 italic mb-6">"{testimonials[currentIndex].quote}"</p>
                <footer className="flex flex-col items-center">
                  <div className="mb-4">
                    <img 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].author}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  </div>
                  <cite className="font-semibold text-gray-900 not-italic">{testimonials[currentIndex].author}</cite>
                  <span className="text-gray-600 text-sm">{testimonials[currentIndex].role}</span>
                </footer>
              </blockquote>
              
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-seva-500' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <button 
                onClick={nextTestimonial}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-seva-500 focus:ring-opacity-50"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
