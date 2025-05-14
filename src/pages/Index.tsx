
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedFood from "@/components/FeaturedFood";
import ImpactStats from "@/components/ImpactStats";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedFood />
        <ImpactStats />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
