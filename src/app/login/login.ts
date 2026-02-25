import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';
import { Authentication, LoggedUser } from "../services/authentication"

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private http: HttpClient, private auth: Authentication) {} // equivale a fazer constructor(http: HttpClient) { this.http = http; }

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
          },
           error: err => {
            console.error('Login failed', err);
            wrongCredentialsDiv.style.display = "initial";
           }
        });
    }
  }
}