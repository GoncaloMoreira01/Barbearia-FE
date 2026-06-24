import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication, LoggedUser } from './authentication';
import { CreateUserObject } from '../models/CreateUserObject';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';

@Injectable({
  providedIn: 'root',
})
export class CreateUser {
  constructor(private http: HttpClient, public auth: Authentication) {}

  createUser(createUserObject: CreateUserObject) {
    return this.http.post<LoggedUser>(ApiEndpoints.USER_CREATE, createUserObject);
  }
}
