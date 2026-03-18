import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatTab } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDivider } from '@angular/material/divider';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../services/authentication';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';
import { barberServices } from '../constants/BarberServiceType';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { Appointements } from '../services/appointements';
import { Testimonial } from '../services/testimonial';
import { User } from '../services/user';
import { TestimonialObject } from '../models/TestimonialObject';
import { map, startWith  } from 'rxjs/operators';

export interface Barber {
  id: number;
  name: string;
}

@Component({
  selector: 'app-panel',
  providers: [provideNativeDateAdapter(), 
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelect, MatOption, MatTab, MatTabGroup, MatDivider, MatExpansionModule, FormsModule, AsyncPipe, ReactiveFormsModule, MatChipListbox, MatChipOption],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})

export class Panel {
  constructor(private http: HttpClient, public auth: Authentication, private fb: FormBuilder, private appointementsService: Appointements, private testimonialService: Testimonial, private userService: User) {}

  rating: number = 0;
  description: string = '';

  barbers$!: Observable<Barber[]>;
  getAvailableDatesForBarberForm!: FormGroup;
  availableSlotsList$!: Observable<string[]>;
  services = barberServices;

  ngOnInit() {
     this.barbers$ = this.userService.getBarbers();
     this.getAvailableDatesForBarberForm = this.fb.group({
      barberId: [''],
      scheduleDate: ['']
    });
  }

  getAvailableDatesForBarber() {
    const barberId = this.getAvailableDatesForBarberForm.get('barberId')?.value;
    let scheduleDate = this.getAvailableDatesForBarberForm.get('scheduleDate')?.value;
    scheduleDate = scheduleDate
      ? scheduleDate.toISOString().split('T')[0]
      : '';

    this.availableSlotsList$ = this.appointementsService.getAvailableDatesForBarber(barberId, scheduleDate)
    .pipe(
      map(slots => slots.map(slot => slot.slice(slot.indexOf("T") + 1, slot.indexOf("T") + 6))),
      startWith([])
    );
  }

  submitReview() {
    const user = this.auth.getUserLogged();
    if (!user) {
      throw new Error("User not logged in");
    }

    const testimonial: TestimonialObject = {
    userId: user.id,
    stars: this.rating,
    description: this.description
    };

    const errorMsg = document.getElementById("errorMsg") as HTMLElement;
    errorMsg.style.display = "none";

    if (this.description == '') {
      errorMsg.style.display = "initial";
      return;
    }

    this.testimonialService.createTestimonial(testimonial)
  }
}
