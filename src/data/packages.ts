export interface TourPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  highlights: string[];
  category: "adventure" | "cultural" | "beach" | "wildlife" | "spiritual";
}

export const tourPackages: TourPackage[] = [
  {
    id: "1",
    name: "Golden Triangle Special",
    description: "Experience the magnificent heritage of North India",
    duration: "6 Days / 5 Nights",
    price: 25999,
    image: "taj-mahal",
    highlights: [
      "Taj Mahal visit at sunrise",
      "Amber Fort & City Palace",
      "Local cultural performances",
      "Traditional cuisine experience",
    ],
    category: "cultural",
  },
  {
    id: "2",
    name: "Kerala Backwaters Retreat",
    description: "Discover tranquility in God's Own Country",
    duration: "5 Days / 4 Nights",
    price: 32999,
    image: "kerala",
    highlights: [
      "Houseboat stay on backwaters",
      "Ayurvedic spa treatments",
      "Tea plantation tours",
      "Traditional Kerala meals",
    ],
    category: "beach",
  },
  {
    id: "3",
    name: "Himalayan Adventure Trek",
    description: "Conquer the mighty peaks and valleys",
    duration: "8 Days / 7 Nights",
    price: 45999,
    image: "himalayas",
    highlights: [
      "Guided mountain trekking",
      "Valley of Flowers visit",
      "Camping under stars",
      "Local village experience",
    ],
    category: "adventure",
  },
  {
    id: "4",
    name: "Royal Rajasthan Tour",
    description: "Journey through the land of kings",
    duration: "7 Days / 6 Nights",
    price: 38999,
    image: "rajasthan",
    highlights: [
      "Desert safari on camels",
      "Palace & fort visits",
      "Folk dance performances",
      "Heritage hotel stays",
    ],
    category: "cultural",
  },
  {
    id: "5",
    name: "Goa Beach Paradise",
    description: "Relax on pristine beaches and enjoy vibrant nightlife",
    duration: "4 Days / 3 Nights",
    price: 18999,
    image: "goa-beach",
    highlights: [
      "Beach hopping tours",
      "Water sports activities",
      "Portuguese heritage sites",
      "Beachside seafood dinners",
    ],
    category: "beach",
  },
  {
    id: "6",
    name: "Spiritual Varanasi Experience",
    description: "Discover India's spiritual heart",
    duration: "3 Days / 2 Nights",
    price: 15999,
    image: "taj-mahal",
    highlights: [
      "Ganga Aarti ceremony",
      "Boat ride at sunrise",
      "Temple visits",
      "Yoga & meditation sessions",
    ],
    category: "spiritual",
  },
];
