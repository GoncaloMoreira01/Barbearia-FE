import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateUser as CreateUserService } from '../../services/create-user';
import { Authentication } from '../../services/authentication';


@Component({
  selector: 'app-create-user',
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {
  constructor(private router: Router, private snackBar: MatSnackBar, private createUserService: CreateUserService, private auth: Authentication) {}

  createUser(form: NgForm) {

    const wrongCredentialsDiv = document.getElementById("wrongCredentials") as HTMLElement;
    wrongCredentialsDiv.style.display = "none";

    if (form.valid) {
      const { name, email, password } = form.value;
      const createUserObject = {
        name,
        email,
        password,
      };
      
      this.createUserService.createUser(createUserObject).subscribe({
        next: (response) => {
          this.showPopup('Utilizador criado com sucesso!', 'success-snackbar');
          this.auth.setUserLogged(response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.showPopup('Erro ao criar utilizador!', 'error-snackbar');
        }
      });
    }
  }

  private showPopup(message: string, panelClass: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
