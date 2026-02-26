import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {
  constructor(public auth : Authentication) {}
}
