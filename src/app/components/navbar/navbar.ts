import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../../services/authentication';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatSnackBarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public auth: Authentication, private snackBar: MatSnackBar) {}

  logout() {
    this.auth.logout();
    this.snackBar.open('Logout efetuado com sucesso!', 'Fechar', {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}
