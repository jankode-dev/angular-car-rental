import { Routes } from '@angular/router';
import { CarList } from './car-list/car-list';
import { CarDetails } from './car-details/car-details';
import { Reservations } from './reservations/reservations';

export const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'cars', component: CarList, title: 'Cars | Rent a Car' },
  { path: 'cars/:id', component: CarDetails, title: 'Car details | Rent a Car' },
  { path: 'reservations', component: Reservations, title: 'Reservations | Rent a Car' },
  { path: '**', redirectTo: 'cars' },
];
