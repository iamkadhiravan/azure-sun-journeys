import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TourCard } from "@/components/TourCard";
import { Chatbot } from "@/components/Chatbot";
import { BookingDialog } from "@/components/BookingDialog";
import { tourPackages, TourPackage } from "@/data/packages";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Index = () => {
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const handleBookNow = (tour: TourPackage) => {
    setSelectedTour(tour);
    setBookingDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Chatbot />
      {selectedTour && (
        <BookingDialog
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          tour={selectedTour}
        />
      )}

      {/* Hero Section */}
      <section id="home" className="pt-20">
        <HeroCarousel />
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Tour Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked tour packages across India and worldwide. From cultural heritage to
              adventure, we have something for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.map((tour) => (
              <TourCard key={tour.id} tour={tour} onBookNow={handleBookNow} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About Unique World Tours
            </h2>
            <p className="text-muted-foreground mb-4">
              With over a decade of experience in the travel industry, Unique World Tours has
              been crafting unforgettable journeys across India. We specialize in creating
              personalized experiences that showcase the rich cultural heritage, natural beauty,
              and diverse landscapes of our incredible country.
            </p>
            <p className="text-muted-foreground">
              Our expert team ensures that every aspect of your journey is carefully planned and
              executed, from accommodation and transportation to guided tours and unique
              experiences. We're committed to making your travel dreams a reality.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Ready to start your adventure? Contact us today!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">+91 81232 00985</p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">info@uniqueworldtours.com</p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 2024 Unique World Tours. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
