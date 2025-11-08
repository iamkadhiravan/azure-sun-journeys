import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import tajMahal from "@/assets/taj-mahal.jpg";
import kerala from "@/assets/kerala.jpg";
import himalayas from "@/assets/himalayas.jpg";
import rajasthan from "@/assets/rajasthan.jpg";
import goaBeach from "@/assets/goa-beach.jpg";

const slides = [
  {
    image: tajMahal,
    title: "Discover the Wonders of India",
    subtitle: "Your Gateway to the World",
  },
  {
    image: kerala,
    title: "Experience Serene Backwaters",
    subtitle: "Kerala's Natural Paradise",
  },
  {
    image: himalayas,
    title: "Majestic Mountain Adventures",
    subtitle: "Himalayan Splendor Awaits",
  },
  {
    image: rajasthan,
    title: "Desert Dreams Come True",
    subtitle: "Royal Rajasthan Experience",
  },
  {
    image: goaBeach,
    title: "Tropical Beach Getaways",
    subtitle: "Sun, Sand & Serenity",
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl drop-shadow-md">
                {slide.subtitle}
              </p>
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-secondary to-secondary-light text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-lg">
                Explore Tours
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-primary" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-primary" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-secondary w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
