import { computed, effect, Injectable, signal } from '@angular/core';
import { Reservation } from './reservation.model';

const storageKey = 'car-rental.reservations';

@Injectable({ providedIn: 'root' })
export class ReservationStore {
  readonly reservations = signal<Reservation[]>(load());
  readonly count = computed(() => this.reservations().length);
  readonly total = computed(() => this.reservations().reduce((sum, r) => sum + r.total, 0));

  constructor() {
    effect(() => localStorage.setItem(storageKey, JSON.stringify(this.reservations())));
  }

  add(reservation: Reservation) {
    this.reservations.update((list) => [...list, reservation]);
  }

  remove(id: number) {
    this.reservations.update((list) => list.filter((r) => r.id !== id));
  }

  clear() {
    this.reservations.set([]);
  }
}

function load(): Reservation[] {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : [];
}
