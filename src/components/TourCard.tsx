import { Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TourPackage } from "@/data/packages";
import tajMahal from "@/assets/taj-mahal.jpg";
import kerala from "@/assets/kerala.jpg";
import himalayas from "@/assets/himalayas.jpg";
import rajasthan from "@/assets/rajasthan.jpg";
import goaBeach from "@/assets/goa-beach.jpg";

const imageMap: Record<string, string> = {
  "taj-mahal": tajMahal,
  kerala: kerala,
  himalayas: himalayas,
  rajasthan: rajasthan,
  "goa-beach": goaBeach,
};

interface TourCardProps {
  tour: TourPackage;
  onBookNow: (tour: TourPackage) => void;
}

export const TourCard = ({ tour, onBookNow }: TourCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageMap[tour.image] || tajMahal}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
            {tour.category.toUpperCase()}
          </span>
        </div>
      </div>
      <CardContent className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-foreground">{tour.name}</h3>
        <p className="text-sm text-muted-foreground">{tour.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{tour.location}</span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Highlights:</p>
          <ul className="space-y-1">
            {tour.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start">
                <span className="text-primary mr-2">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="text-2xl font-bold text-primary">₹{tour.price.toLocaleString("en-IN")}</p>
        </div>
        <Button
          onClick={() => onBookNow(tour)}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};
