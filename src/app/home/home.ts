import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Authentication } from '../services/authentication';


@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(public auth: Authentication) {}
}
