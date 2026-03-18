import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Authentication } from '../services/authentication';
import { OnInit } from '@angular/core';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Testimonial } from '../services/testimonial';


export interface TestimonialObj {
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
  constructor(public http: HttpClient, public auth: Authentication, private testimonialService : Testimonial) {}

  testimonials$!: Observable<TestimonialObj[]>;
  testimonialsList: TestimonialObj[] = [];
  currentIndex = 0;

  ngOnInit() {
   this.testimonials$ = this.testimonialService.getTestimonials();
  }

  next(total: number) {
    this.currentIndex = (this.currentIndex + 1) % total;
  }
  
  prev(total: number) {
    this.currentIndex = (this.currentIndex - 1 + total) % total;
  }
}
