import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Car } from '../car.model';
import { ReservationStore } from '../reservation-store';

@Component({
  selector: 'cr-car-details',
  imports: [CurrencyPipe, PercentPipe, RouterLink],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css',
})
export class CarDetails {
  private readonly store = inject(ReservationStore);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  protected readonly carResource = httpResource<Car>(() => `api/cars/${this.id()}`);
  protected readonly car = computed(() =>
    this.carResource.hasValue() ? this.carResource.value() : undefined,
  );

  private readonly similarResource = httpResource<Car[]>(
    () => {
      const car = this.car();
      return car ? { url: 'api/cars', params: { category: car.category } } : undefined;
    },
    { defaultValue: [] },
  );

  protected readonly similarCars = computed(() => {
    const cars = this.similarResource.hasValue() ? this.similarResource.value() : [];
    return cars.filter((c) => c.id !== this.car()?.id && c.available);
  });

  protected readonly days = linkedSignal(() => this.car()?.minDays ?? 1);
  protected readonly discount = computed(() => (this.days() >= 7 ? 0.1 : 0));
  protected readonly total = computed(
    () => (this.car()?.pricePerDay ?? 0) * this.days() * (1 - this.discount()),
  );

  protected changeDays(delta: number) {
    const minDays = this.car()?.minDays ?? 1;
    this.days.update((days) => Math.max(minDays, days + delta));
  }

  protected reserve() {
    const car = this.car();
    if (!car) {
      return;
    }

    this.store.add({ id: Date.now(), car, days: this.days(), total: this.total() });
    this.router.navigate(['/reservations']);
  }
}
