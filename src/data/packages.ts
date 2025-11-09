export interface TourPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  highlights: string[];
  category: "adventure" | "cultural" | "beach" | "wildlife" | "spiritual";
  location: string;
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
    location: "India",
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
    location: "India",
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
    location: "India",
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
    location: "India",
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
    location: "India",
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
    location: "India",
  },
  // International packages
  {
    id: "7",
    name: "European Capitals Tour",
    description: "Iconic cities, culture, and cuisine across Europe",
    duration: "10 Days / 9 Nights",
    price: 129999,
    image: "rajasthan",
    highlights: [
      "Paris, Rome, and Berlin city tours",
      "Museums & historical sites",
      "Scenic train journeys",
      "Local culinary experiences",
    ],
    category: "cultural",
    location: "Europe",
  },
  {
    id: "8",
    name: "USA West Coast Explorer",
    description: "From San Francisco to Los Angeles with national parks",
    duration: "9 Days / 8 Nights",
    price: 139999,
    image: "goa-beach",
    highlights: [
      "Golden Gate Bridge",
      "Yosemite day trip",
      "Hollywood & Santa Monica",
      "Las Vegas optional add-on",
    ],
    category: "adventure",
    location: "Americas",
  },
  {
    id: "9",
    name: "Japan & Korea Discovery",
    description: "Modern cities, ancient temples, and coastal beauty",
    duration: "8 Days / 7 Nights",
    price: 149999,
    image: "kerala",
    highlights: [
      "Tokyo & Kyoto highlights",
      "Seoul palaces & street food",
      "Bullet train experience",
      "Onsen & cultural workshops",
    ],
    category: "cultural",
    location: "Asia-Pacific",
  },
  {
    id: "10",
    name: "South Africa Safari Adventure",
    description: "Wildlife, wine country, and Cape Town coast",
    duration: "7 Days / 6 Nights",
    price: 119999,
    image: "himalayas",
    highlights: [
      "Kruger National Park safari",
      "Table Mountain & Cape Peninsula",
      "Winelands tour",
      "Cultural experiences",
    ],
    category: "wildlife",
    location: "Africa",
  },
];
