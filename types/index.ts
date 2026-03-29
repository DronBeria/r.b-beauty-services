export type Category =
  | 'All Services'
  | 'Threading'
  | 'Waxing'
  | 'Nufree Waxing'
  | 'Facial Treatments'
  | 'Laser Hair Removal'
  | "Men's Services";

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
