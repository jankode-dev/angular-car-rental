import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Car } from '../car.model';

@Component({
  selector: 'cr-car-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard {
  readonly car = input.required<Car>();
}
