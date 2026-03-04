import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Authentication } from '../services/authentication';
import { OnInit } from '@angular/core';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


export interface Testimonial {
  userName: string;
  stars: number;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(public http: HttpClient, public auth: Authentication) {}

  testimonials$!: Observable<Testimonial[]>;
  testimonialsList: Testimonial[] = [];
  currentIndex = 0;

  ngOnInit() {
   this.testimonials$ = this.http.get<Testimonial[]>(ApiEndpoints.GET_TESTIMONIALS);
  }

  next(total: number) {
    this.currentIndex = (this.currentIndex + 1) % total;
  }
  
  prev(total: number) {
    this.currentIndex = (this.currentIndex - 1 + total) % total;
  }
}
