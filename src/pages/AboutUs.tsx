
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, BookOpen, Wheat } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">About SevaCompass</h1>
          <p className="text-lg text-gray-700 mb-8">
            SevaCompass is dedicated to reducing food waste and addressing hunger by connecting 
            food donors with those who need it most. Our platform offers a simple, effective way 
            to share food resources within communities.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                SevaCompass aims to create a world where no food goes to waste and no one goes hungry. 
                We believe in the power of communities coming together to solve the dual problems of 
                food waste and food insecurity.
              </p>
              <p className="text-gray-700">
                By providing a platform that makes food donation and collection easy, accessible, and dignified, 
                we're working toward a more sustainable and compassionate future.
              </p>
            </div>
            
            <div className="bg-seva-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Wheat className="mr-2 text-seva-600" />
                <span>Why We Do This</span>
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <span className="bg-seva-200 text-seva-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                  <span><strong>Food Waste:</strong> Nearly one-third of all food produced globally is wasted, contributing to environmental problems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-seva-200 text-seva-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                  <span><strong>Food Insecurity:</strong> Millions of people worldwide lack reliable access to affordable, nutritious food.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-seva-200 text-seva-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                  <span><strong>Community Building:</strong> Food sharing strengthens community bonds and promotes social responsibility.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                name: "Aanya Sharma",
                role: "Founder & Executive Director",
                bio: "Passionate about food sustainability and community empowerment."
              },
              {
                name: "Michael Rodriguez",
                role: "Operations Manager",
                bio: "Expert in logistics and community organizing for social impact."
              },
              {
                name: "Sarah Johnson",
                role: "Community Outreach",
                bio: "Dedicated to building partnerships with food banks and donors."
              }
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-3 h-24 w-24 bg-seva-100 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-3xl text-seva-500 font-bold">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                  <p className="text-seva-600 text-center mb-2">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-seva-100 rounded-full">
                  <Mail className="text-seva-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">info@sevacompass.org</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-seva-100 rounded-full">
                  <MapPin className="text-seva-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">123 Community Lane<br />Helping City, HC 54321</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-seva-100 rounded-full">
                  <BookOpen className="text-seva-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Resources</h3>
                <p className="text-gray-600">Download our guides and learn about food sharing</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-seva-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Movement</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Whether you want to donate food, find food, or volunteer with us, there's a place for you 
              in the SevaCompass community.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-seva-500 hover:bg-seva-600">Become a Donor</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Volunteer With Us</Button>
              <Button variant="outline" className="border-seva-500 text-seva-600 hover:bg-seva-50">Partner Organization</Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
