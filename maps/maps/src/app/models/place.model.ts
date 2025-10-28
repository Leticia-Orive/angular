export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  description?: string;
  openingHours?: string[];
  images?: string[];
}

export enum PlaceCategory {
  RESTAURANT = 'restaurant',
  GAS_STATION = 'gas_station',
  ACCOMMODATION = 'accommodation',
  TOURIST_ATTRACTION = 'tourist_attraction'
}

export interface PlaceCategoryConfig {
  key: PlaceCategory;
  label: string;
  icon: string;
  color: string;
}
