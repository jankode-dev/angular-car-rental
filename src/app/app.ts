import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  imports: [RouterOutlet, Header],
  selector: 'cr-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
