export type Category = 'Economy' | 'Compact' | 'SUV' | 'Van' | 'Electric';

export interface Car {
  id: number;
  make: string;
  model: string;
  category: Category;
  seats: number;
  transmission: 'Manual' | 'Automatic';
  pricePerDay: number;
  minDays: number;
  available: boolean;
}
