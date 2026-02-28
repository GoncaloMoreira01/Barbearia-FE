import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatTab } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDivider } from '@angular/material/divider';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../services/authentication';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';

export interface Testimonial {
  userId: number;
  stars: number;
  review: string;
}

@Component({
  selector: 'app-panel',
  providers: [provideNativeDateAdapter(), 
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTab, MatTabGroup, MatDivider, MatExpansionModule, FormsModule, Authentication],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  constructor(private http: HttpClient, public auth: Authentication) {}

  rating: number = 0;
  reviewText: string = '';

  submitReview() {
    const testimonial = {
    userId: this.auth.getUserLogged()?.id,
    stars: this.rating,
    review: this.reviewText
    };

    const errorMsg = document.getElementById("errorMsg") as HTMLElement;
    errorMsg.style.display = "none";

    if (this.reviewText == '') {
      errorMsg.style.display = "initial";
      return;
    }

    this.http.post<string>(ApiEndpoints.CREATE_TESTIMONIAL, { testimonial })
      .subscribe({
        next: response => {
          console.log('testimonial created')
          
        },
        error: err => {
        console.error('testimonial creation failed', err);
        }
    });
  }
}
