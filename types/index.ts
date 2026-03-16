export type Category =
  | 'All Services'
  | 'Laser Treatments'
  | 'Facial Rituals'
  | 'Clinical Care'
  | 'Waxing'
  | 'Packages';

export interface Service {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: string;
  duration: string;
  benefits: string[];
  image: string;
  isPopular?: boolean;
  badge?: string;
}

export interface CartItem extends Service {
  quantity: number;
}
