import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservationStore } from '../reservation-store';

@Component({
  selector: 'cr-reservations',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
})
export class Reservations {
  protected readonly store = inject(ReservationStore);
}
