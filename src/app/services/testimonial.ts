import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authentication } from '../services/authentication';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';
import { TestimonialObject } from '../models/TestimonialObject';

export interface Testimonial {
  userId: number;
  stars: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class Testimonial {
  constructor(private http: HttpClient, public auth: Authentication) {}

  createTestimonial(testimonial: TestimonialObject) {
    return this.http.post<string>(ApiEndpoints.CREATE_TESTIMONIAL, testimonial);
  }
  
}
