
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";

// Define the form schema
const donationFormSchema = z.object({
  food_name: z.string().min(1, "Food name is required"),
  food_type: z.enum(["fresh_produce", "canned_goods", "baked_goods", "cooked_meals", "beverages", "dry_goods", "other"]),
  quantity: z.coerce.number().positive("Quantity must be a positive number"),
  description: z.string().optional(),
  expiry_date: z.string().optional(),
  pickup_location: z.string().min(1, "Pickup location is required"),
  pickup_instructions: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

const DonateForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      food_name: "",
      food_type: "fresh_produce",
      quantity: 1,
      description: "",
      expiry_date: "",
      pickup_location: "",
      pickup_instructions: "",
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      toast.error("You must be logged in to donate food");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const onSubmit = async (values: DonationFormValues) => {
    if (!user) {
      toast.error("You must be logged in to donate food");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Format the data for submission
      const donationData = {
        user_id: user.id,
        food_name: values.food_name,
        food_type: values.food_type,
        quantity: values.quantity,
        description: values.description || null,
        expiry_date: values.expiry_date || null,
        pickup_location: values.pickup_location,
        pickup_instructions: values.pickup_instructions || null,
      };
      
      // Submit the donation to Supabase
      const { error } = await supabase
        .from("food_donations")
        .insert(donationData);
      
      if (error) {
        console.error("Error submitting donation:", error);
        toast.error("Failed to submit donation. Please try again.");
        return;
      }
      
      toast.success("Food donation submitted successfully!");
      form.reset();
      
      // Navigate back to the donation info page after successful submission
      setTimeout(() => {
        navigate("/donate-info");
      }, 1500);
      
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

  // If loading, show a loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto flex-grow flex justify-center items-center">
          <p className="text-xl">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <Button 
            onClick={() => navigate("/donate-info")} 
            variant="outline"
            className="mb-4 text-lg"
          >
            ← Back to Information
          </Button>
          <h1 className="text-3xl font-bold mb-3 text-gray-900">Donation Form</h1>
          <p className="text-lg text-gray-700">
            Please complete this form to register your food donation.
          </p>
        </div>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Food Donation Details</CardTitle>
            <CardDescription className="text-lg">Fields marked with * are required</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="food_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Food Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Canned soup, Fresh vegetables" {...field} className="text-lg p-6" />
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
                      <FormLabel className="text-lg">Food Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-lg p-6">
                            <SelectValue placeholder="Select food type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {foodTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-lg">
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
                      <FormLabel className="text-lg">Quantity *</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} className="text-lg p-6" />
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
                      <FormLabel className="text-lg">Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide details about the food item, e.g., brand, ingredients, dietary information"
                          {...field}
                          className="text-lg min-h-[100px]"
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
                      <FormLabel className="text-lg">Expiry Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="text-lg p-6" />
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
                      <FormLabel className="text-lg">Pickup Location *</FormLabel>
                      <FormControl>
                        <Input placeholder="Address or area for pickup" {...field} className="text-lg p-6" />
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
                      <FormLabel className="text-lg">Pickup Instructions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special instructions for pickup, e.g., available hours, contact information"
                          {...field}
                          className="text-lg min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-seva-500 hover:bg-seva-600 text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Donation"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default DonateForm;
