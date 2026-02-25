import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public auth: Authentication) {}

  logout() {
    this.auth.logout()
  }
}
