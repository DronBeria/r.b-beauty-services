export type Category = 
  | 'All Services' 
  | 'Laser Treatments' 
  | 'Facial Treatments' 
  | 'Skincare' 
  | 'Waxing' 
  | 'Add-ons' 
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
}

export interface CartItem extends Service {
  quantity: number;
}
