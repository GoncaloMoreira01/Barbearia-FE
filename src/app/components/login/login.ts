import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/ApiEndpointsEnum';
import { Authentication, LoggedUser } from "../../services/authentication"
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatSnackBarModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private http: HttpClient, private auth: Authentication, private router: Router, private snackBar: MatSnackBar) {} // equivale a fazer constructor(http: HttpClient) { this.http = http; }

  login(form: NgForm) {
    const wrongCredentialsDiv = document.getElementById("wrongCredentials") as HTMLElement;
     wrongCredentialsDiv.style.display = "none";

    if (form.valid) {
      const { email, password } = form.value;

      this.http.post<LoggedUser>(ApiEndpoints.USER_LOGIN, { email, password })
        .subscribe({
          next: response => {
            console.log('Login successful')
            this.auth.setUserLogged(response);
            this.showPopup('Login successful!', 'success-snackbar');
            this.router.navigate(["/home"])
          },
           error: err => {
            console.error('Login failed', err);
            wrongCredentialsDiv.style.display = "initial";
            this.showPopup('Invalid credentials.', 'error-snackbar');
           }
        });
      }
  }

  private showPopup(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
