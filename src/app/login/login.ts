import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private http: HttpClient) {} // equivale a fazer constructor(http: HttpClient) { this.http = http; }

  login(form: NgForm) {
    const wrongCredentialsDiv = document.getElementById("wrongCredentials") as HTMLElement;
     wrongCredentialsDiv.style.display = "none";

    if (form.valid) {
      const { email, password } = form.value;

      this.http.post(ApiEndpoints.USER_LOGIN, { email, password })
        .subscribe({
          next: res => console.log('Login successful', res),
           error: err => {
            console.error('Login failed', err);
            wrongCredentialsDiv.style.display = "initial";
           }
        });
    }
  }
}