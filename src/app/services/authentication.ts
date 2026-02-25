import { Injectable } from '@angular/core';

export interface LoggedUser {
  id: number;
  name: string;
  role: number;
}

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  private USER_LOGGED = 'loggedUser';

  setUserLogged(user: LoggedUser) {
    localStorage.setItem(this.USER_LOGGED, JSON.stringify(user));
  }

  getUserLogged(): LoggedUser | null {
    const data = localStorage.getItem(this.USER_LOGGED);
    return data ? JSON.parse(data) : null;
  }

  isUserLoggedIn(): boolean {
    return this.getUserLogged() !== null;
  }

  logout() {
    localStorage.removeItem(this.USER_LOGGED);
  }
  
}

