import { Car } from './car.model';

export interface Reservation {
  id: number;
  car: Car;
  days: number;
  total: number;
}
