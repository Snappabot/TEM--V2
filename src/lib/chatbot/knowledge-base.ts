// Troweled Earth Knowledge Base
// Product information for chatbot responses

export interface ProductInfo {
  name: string;
  category: string;
  overview: string;
  applications: string[];
  keyFeatures: string[];
  warranty: string;
  maintenance: string;
  technicalSpecs: Record<string, string>;
}

export const products: ProductInfo[] = [
  {
    name: "Marbellino",
    category: "Polished Plaster",
    overview: "High-performance decorative coating creating surfaces with elevated aesthetic value and a stone-like, slightly marbled effect. Suitable for modern and classic architectural designs, including floors.",
    applications: [
      "Internal and external walls",
      "Internal floors (unique among TEM products)",
      "Bathrooms and wet areas",
      "Ceilings and landscaping features",
      "Hotels, restaurants, shops, showrooms"
    ],
    keyFeatures: [
      "Stone-like, marbled aesthetic",
      "Floor application available (unique!)",
      "Suitable for bathrooms",
      "Interior AND exterior use",
      "Low VOC (<50 g/L)",
      "Non-combustible",
      "Repairable and patchable with no visible marks",
      "Made in Australia"
    ],
    warranty: "10-Year Limited Warranty for residential applications",
    maintenance: "Clean every 12-18 months. Floor sealers may need reapplication every 24 months.",
    technicalSpecs: {
      "VOC": "<50 g/L (Green Star compliant)",
      "Flammability": "Non-combustible (AS 1530.1)",
      "Cure Time": "5-7 days full cure",
      "Package Sizes": "10kg & 20kg containers"
    }
  },
  {
    name: "Rokka",
    category: "Textured Finish",
    overview: "High-performance decorative wall coating for modern and classic architectural designs. Provides a smooth, slightly rustic finish with subtle undulations.",
    applications: [
      "Internal and external walls and ceilings",
      "Halls, stairways, bathrooms, living rooms",
      "Hotels, restaurants, shops, showrooms",
      "Class 1-10 buildings (NCC 2022 compliant)"
    ],
    keyFeatures: [
      "Versatile - modern AND classic designs",
      "Custom colour options available",
      "Rustic finish with subtle undulations",
      "Interior AND exterior use",
      "Low VOC",
      "Non-combustible",
      "Thick application (2-5mm)"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months. Inspect sealants at substrate interfaces.",
    technicalSpecs: {
      "Thickness": "2-5mm",
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible",
      "Cure Time": "5-7 days"
    }
  },
  {
    name: "Tadelakt",
    category: "Waterproof Plaster",
    overview: "Traditional Moroccan lime plaster known for its waterproof properties and luxurious appearance. Creates a seamless, naturally waterproof surface perfect for wet areas.",
    applications: [
      "Bathrooms and showers",
      "Wet areas and pools",
      "Kitchens and splashbacks",
      "Feature walls",
      "Hammams and spas"
    ],
    keyFeatures: [
      "Naturally waterproof - no sealer needed in wet areas",
      "Seamless surface - no grout lines",
      "Naturally antibacterial (high pH lime)",
      "Organic, warm aesthetic",
      "Traditional Moroccan technique",
      "Can be polished with stones and soap"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean with mild soap. Can be re-polished to restore shine.",
    technicalSpecs: {
      "Waterproof": "Yes - naturally",
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible",
      "Cure Time": "5-7 days"
    }
  },
  {
    name: "Tadelino",
    category: "Polished Plaster",
    overview: "A refined variation of Tadelakt offering a smoother, more contemporary finish while maintaining excellent water resistance. Perfect for modern bathrooms.",
    applications: [
      "Modern bathrooms",
      "Feature walls",
      "Wet areas",
      "Contemporary interiors"
    ],
    keyFeatures: [
      "Smoother than traditional Tadelakt",
      "Contemporary aesthetic",
      "Water resistant",
      "Seamless finish",
      "Low VOC"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months",
    technicalSpecs: {
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible"
    }
  },
  {
    name: "Concretum",
    category: "Concrete Look",
    overview: "Innovative product creating a unique washed patina finish on walls and surfaces. Provides depth and texture with the appearance of natural stone or concrete. UV stable, easy to apply.",
    applications: [
      "Interior and exterior walls",
      "Feature walls",
      "Commercial spaces",
      "Modern industrial designs"
    ],
    keyFeatures: [
      "Unique washed patina finish",
      "Natural stone or concrete look",
      "Industrial-style aesthetic",
      "UV stable",
      "Easy to apply",
      "Affordable without compromising quality"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months",
    technicalSpecs: {
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible"
    }
  },
  {
    name: "Antique Stucco",
    category: "Decorative Finish",
    overview: "Premium, trowel-applied decorative wall coating designed to provide a smooth, aged appearance reminiscent of Southern European architecture. Known to age beautifully over time.",
    applications: [
      "Internal and external walls, ceilings",
      "Landscaping features",
      "High-traffic areas: entries, hotels, restaurants",
      "Heritage restorations"
    ],
    keyFeatures: [
      "Southern European aged aesthetic",
      "Interior AND exterior use",
      "Low VOC, environmentally friendly",
      "Non-combustible",
      "Durable for high-traffic areas",
      "Custom colours available",
      "Ages beautifully"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months. Low-pressure water blast (<450 psi) at 45° angle.",
    technicalSpecs: {
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible (AS 1530.1-1994)",
      "Cure Time": "5-7 days"
    }
  },
  {
    name: "Hemp Earthen Render",
    category: "Sustainable Finish",
    overview: "High-performance decorative wall coating delivering modern, classic, or rustic rammed earth finishes. Contains hemp fibres for enhanced durability and sustainability.",
    applications: [
      "Internal and external walls, ceilings",
      "Bathrooms, hallways, stairways, living areas",
      "Outdoor features and landscaping",
      "Eco-conscious projects"
    ],
    keyFeatures: [
      "Sustainable hemp fibre content",
      "Authentic rammed earth aesthetic",
      "Interior AND exterior use",
      "Suitable for bathrooms",
      "Low VOC, eco-friendly",
      "Non-combustible",
      "Thicker application (3-5mm) for durability"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months. Low-pressure water blast.",
    technicalSpecs: {
      "Thickness": "3-5mm",
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible (AS 1530.1)"
    }
  }
];

export const companyInfo = {
  name: "Troweled Earth Melbourne",
  established: 2002,
  location: "Melbourne, Victoria, Australia",
  contact: {
    phone: "0439 243 055",
    email: "matt-troweledearth@outlook.com",
    instagram: "@troweled_earth_melbourne"
  },
  about: "Troweled Earth Melbourne specializes in premium artisan plaster finishes. Since 2002, we've been transforming walls into works of art using natural, sustainable materials. Our finishes are handcrafted by skilled applicators using traditional techniques combined with modern innovation.",
  services: [
    "Residential plaster applications",
    "Commercial projects",
    "Applicator training and workshops",
    "Product supply",
    "Consultation and quoting"
  ],
  warranties: "All products come with a 10-Year Limited Warranty when applied by Troweled Earth-approved applicators."
};

export const faqs = [
  {
    question: "What areas can your finishes be used in?",
    answer: "Our finishes can be used both internally and externally. Products like Marbellino and Tadelakt are suitable for wet areas including bathrooms and showers. Marbellino can even be used on floors."
  },
  {
    question: "How long does the finish last?",
    answer: "All our products come with a 10-Year Limited Warranty. With proper maintenance (cleaning every 12-18 months), our finishes can last decades."
  },
  {
    question: "Are your products environmentally friendly?",
    answer: "Yes! All our products are low VOC (<50 g/L), Green Star compliant, and non-combustible. Our Hemp Earthen Render contains sustainable hemp fibres."
  },
  {
    question: "Can I get a quote?",
    answer: "Absolutely! Contact Matt on 0439 243 055 or email matt-troweledearth@outlook.com. We can discuss your project and provide a detailed quote."
  },
  {
    question: "Do you offer training?",
    answer: "Yes, we run workshops for plasterers, builders, and DIY enthusiasts. Check our website or Instagram @troweled_earth_melbourne for upcoming dates."
  },
  {
    question: "What's the difference between Tadelakt and Marbellino?",
    answer: "Tadelakt is a traditional Moroccan waterproof lime plaster - naturally waterproof, polished with stones. Marbellino gives a stone-like marbled effect and can be used on floors. Both work in wet areas, but Tadelakt is the premium choice for showers."
  },
  {
    question: "How much does it cost?",
    answer: "Pricing depends on the product, area size, and complexity of the project. Contact us for a free quote - we'll visit your site and provide detailed pricing."
  },
  {
    question: "Where are you located?",
    answer: "We're based in Melbourne, Victoria and service the greater Melbourne area. We also supply products interstate."
  }
];
