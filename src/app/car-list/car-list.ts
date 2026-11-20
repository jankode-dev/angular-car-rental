import { Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Car, Category } from '../car.model';
import { CarCard } from '../car-card/car-card';

@Component({
  selector: 'cr-car-list',
  imports: [CarCard],
  templateUrl: './car-list.html',
  styleUrl: './car-list.css',
})
export class CarList {
  protected readonly categories: (Category | 'All')[] = [
    'All',
    'Economy',
    'Compact',
    'SUV',
    'Van',
    'Electric',
  ];
  protected readonly category = signal<Category | 'All'>('All');
  protected readonly search = signal('');

  protected readonly carsResource = httpResource<Car[]>(
    () => {
      const category = this.category();
      const params: Record<string, string> = category === 'All' ? {} : { category };
      return { url: 'api/cars', params };
    },
    { defaultValue: [] },
  );

  protected readonly cars = computed(() => {
    const term = this.search().trim().toLowerCase();
    const cars = this.carsResource.hasValue() ? this.carsResource.value() : [];
    return cars.filter((car) => `${car.make} ${car.model}`.toLowerCase().includes(term));
  });
}
