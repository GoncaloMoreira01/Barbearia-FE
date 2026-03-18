import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Barber {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class User {
constructor(private http: HttpClient) {}


  getBarbers() : Observable<Barber[]> {
    return this.http.get<Barber[]>(ApiEndpoints.GET_BARBERS);
  }
  
}
