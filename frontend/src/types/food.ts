export interface JourneyStage {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  location: string;
  coordinates: [number, number];
  blockchainHash: string;
  verified: boolean;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  origin: string;
  farmer: Farmer;
  certifications: Certification[];
  journey: JourneyStage[];
  sustainability: SustainabilityMetrics;
  trustScore: number;
  imageUrl: string;
  harvestDate: string;
  expiryDate: string;
}

export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  bio: string;
  imageUrl: string;
  rating: number;
  productsCount: number;
  yearsExperience: number;
  certifications: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  validUntil: string;
  verified: boolean;
  logoUrl?: string;
}

export interface SustainabilityMetrics {
  carbonFootprint: number;
  waterUsage: number;
  pesticideFree: boolean;
  organicScore: number;
  localSourcing: number;
  packagingRecyclable: boolean;
  comparisonToConventional: {
    carbonSaved: number;
    waterSaved: number;
    chemicalsAvoided: number;
  };
}

export interface UserImpact {
  totalProducts: number;
  carbonSaved: number;
  waterSaved: number;
  pesticideAvoided: number;
  farmersSupported: number;
  trustPoints: number;
}

export interface Notification {
  id: string;
  type: 'recall' | 'season' | 'achievement' | 'update';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  productId?: string;
}
