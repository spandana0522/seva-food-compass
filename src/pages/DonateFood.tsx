
import { useState } from "react";
import { Utensils, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form schema
const donationFormSchema = z.object({
  food_name: z.string().min(1, "Food name is required"),
  food_type: z.enum(["fresh_produce", "canned_goods", "baked_goods", "cooked_meals", "beverages", "dry_goods", "other"]),
  quantity: z.string().transform(val => parseInt(val, 10)).refine(val => !isNaN(val) && val > 0, "Quantity must be a positive number"),
  description: z.string().optional(),
  expiry_date: z.string().optional(),
  pickup_location: z.string().min(1, "Pickup location is required"),
  pickup_instructions: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

const DonateFood = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      food_name: "",
      food_type: "fresh_produce",
      quantity: "1",
      description: "",
      expiry_date: "",
      pickup_location: "",
      pickup_instructions: "",
    },
  });

  const onSubmit = async (values: DonationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Check if the user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to donate food");
        navigate("/login");
        return;
      }
      
      // Format the data for submission
      const donationData = {
        ...values,
        user_id: session.user.id,
        expiry_date: values.expiry_date || null,
      };
      
      // Submit the donation to Supabase
      const { error } = await supabase.from("food_donations").insert(donationData);
      
      if (error) {
        console.error("Error submitting donation:", error);
        toast.error("Failed to submit donation. Please try again.");
        return;
      }
      
      toast.success("Food donation submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Error in donation process:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const foodTypeOptions = [
    { value: "fresh_produce", label: "Fresh Produce" },
    { value: "canned_goods", label: "Canned Goods" },
    { value: "baked_goods", label: "Baked Goods" },
    { value: "cooked_meals", label: "Cooked Meals" },
    { value: "beverages", label: "Beverages" },
    { value: "dry_goods", label: "Dry Goods" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Donate Food</h1>
          <p className="text-lg text-gray-700 mb-8">
            Help feed those in need by donating unused food items. Your contribution 
            makes a significant difference in combating food waste and hunger in our community.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="md:order-2">
              <CardHeader>
                <CardTitle>Donate Food</CardTitle>
                <CardDescription>Fill out this form to donate food</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="food_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Canned soup, Fresh vegetables" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="food_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select food type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {foodTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about the food item, e.g., brand, ingredients, dietary information"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="expiry_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date (Optional)</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pickup_location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Address or area for pickup" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pickup_instructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Instructions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special instructions for pickup, e.g., available hours, contact information"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-seva-500 hover:bg-seva-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Donate Food"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <div className="space-y-8 md:order-1">
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>Simple steps to donate your food</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-seva-100 p-2 rounded-full">
                      <Utensils className="text-seva-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">List Your Food</h3>
                      <p className="text-gray-600">Add details about the food you wish to donate including quantity, expiry date, and pick-up instructions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-seva-100 p-2 rounded-full">
                      <MapPin className="text-seva-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Arrange Pick-Up</h3>
                      <p className="text-gray-600">Specify your location and available time slots for the food to be collected.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-seva-100 p-2 rounded-full">
                      <Calendar className="text-seva-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Schedule Confirmed</h3>
                      <p className="text-gray-600">Receive confirmation once someone has agreed to pick up your donation.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Guidelines for Donation</CardTitle>
                  <CardDescription>What food can you donate?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Acceptable Items</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>Unopened packaged foods within expiry date</li>
                      <li>Fresh fruits and vegetables</li>
                      <li>Canned goods and non-perishables</li>
                      <li>Baked goods (within 24 hours of baking)</li>
                      <li>Sealed beverages</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">Not Acceptable</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>Expired food items</li>
                      <li>Opened packages</li>
                      <li>Food with signs of spoilage</li>
                      <li>Homemade items without proper labeling</li>
                      <li>Alcohol or items requiring refrigeration for over 2 hours</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">For any questions about donations, please contact our support team.</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DonateFood;
