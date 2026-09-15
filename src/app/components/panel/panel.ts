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
import { Authentication } from '../../services/authentication';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { barberServices } from '../../constants/BarberServiceType';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Appointements } from '../../services/appointements';
import { Testimonial } from '../../services/testimonial';
import { User } from '../../services/user';
import { TestimonialObject } from '../../models/TestimonialObject';
import { map, startWith  } from 'rxjs/operators';
import { ApointmentObject, FutureAndOldAppointmentsObject, AppointmentInfo, UpdateAppointmentObject } from '../../models/AppointmentObjects';

export interface Barber {
  id: number;
  name: string;
}

@Component({
  selector: 'app-panel',
  providers: [provideNativeDateAdapter(), 
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelect, MatOption, MatTab, MatTabGroup, MatDivider, MatExpansionModule, FormsModule, AsyncPipe, ReactiveFormsModule, MatChipListbox, MatChipOption, MatSnackBarModule, DatePipe],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})

export class Panel {
  constructor(private http: HttpClient, public auth: Authentication, private fb: FormBuilder, private appointementsService: Appointements, private testimonialService: Testimonial, private userService: User, private snackBar: MatSnackBar) {}

  userId: any;
  isBarber: boolean = false;

  rating: number = 0;
  description: string = '';

  selectedDate!: Date;

  barbers$!: Observable<Barber[]>;
  getAvailableDatesForBarberForm!: FormGroup;
  createAppointmentForm!: FormGroup;
  availableSlotsList$!: Observable<string[]>;
  showBookingDetails = false;
  services = barberServices;

  oldClientAppointments$!: Observable<FutureAndOldAppointmentsObject[]>;
  nextClientAppointments$!: Observable<FutureAndOldAppointmentsObject[]>;
  barberAppointments$!: Observable<FutureAndOldAppointmentsObject[]>;
  appointmentBeingEditedId: number | null = null;
  appointmentBeingCancelledId: number | null = null;
  appointmentPendingCancellationId: number | null = null;
  appointmentBeingEdited: AppointmentInfo | null = null;
  selectedTabIndex = 0;

  ngOnInit() {
    this.userId = this.auth.getUserLogged()?.id;
    this.isBarber = this.auth.getUserLogged()?.role === 1;

     this.barbers$ = this.userService.getBarbers();
     this.getAvailableDatesForBarberForm = this.fb.group({
      barberId: [''],
      scheduleDate: ['']
    });
    this.createAppointmentForm = this.fb.group({
      serviceId: [''],
      description: [''],
      scheduleHour: ['']
    });

    this.getAvailableDatesForBarberForm.valueChanges.subscribe(() => {
      this.showBookingDetails = false;
      this.createAppointmentForm.get('scheduleHour')?.reset();
    });

    if (this.userId !== undefined) {
      this.oldClientAppointments$ = this.appointementsService.getOldClientAppointments(this.userId);
      this.nextClientAppointments$ = this.appointementsService.getNextClientAppointments(this.userId);
    }
  }

  getServiceName(id: number): string {
    const service = barberServices.find(service => service.id === id);
    return service ? service.name : '';
  }


  getBarberAppointmentsByDate() {
     if (this.selectedDate) {
      this.barberAppointments$ = this.appointementsService.getBarberAppointments(this.userId, this.selectedDate);
     }
  }

  getAvailableDatesForBarber() {
    const barberId = this.getAvailableDatesForBarberForm.get('barberId')?.value;
    const selectedDate = this.getAvailableDatesForBarberForm.get('scheduleDate')?.value as Date | null;
    const scheduleDate = selectedDate
      ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
      : '';

    this.availableSlotsList$ = this.appointementsService.getAvailableDatesForBarber(barberId, scheduleDate)
    this.showBookingDetails = true;
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

    this.testimonialService.createTestimonial(testimonial).subscribe({
      next: response => {
        if (response.status === 201) {
          this.showPopup('Review successfully submitted!', 'success-snackbar');
        }
      },
      error: err => this.showEndpointError(err)
    });
  }

  createAppointment() {
    const user = this.auth.getUserLogged();
    if (!user) {
      throw new Error("User not logged in");
    }

    const [hours, minutes] = this.createAppointmentForm.get('scheduleHour')?.value.split(':').map(Number);
    const selectedDate = this.getAvailableDatesForBarberForm.get('scheduleDate')?.value as Date;
    const pad = (value: number) => value.toString().padStart(2, '0');
    const buildedScheduleDate =
      `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}` +
      `T${pad(hours)}:${pad(minutes)}:00`;

    const appointmentObject: ApointmentObject = {
      clientId: user.id,
      barberId: this.getAvailableDatesForBarberForm.get('barberId')?.value,
      scheduleDate: buildedScheduleDate,
      description: this.createAppointmentForm.get('description')?.value,
      serviceType: this.createAppointmentForm.get('serviceId')?.value
    };

    const request = this.appointmentBeingEdited?.appointmentId
      ? this.appointementsService.updateAppointment({
          ...appointmentObject,
          appointmentId: this.appointmentBeingEdited.appointmentId,
        } as UpdateAppointmentObject)
      : this.appointementsService.createAppointment(appointmentObject);

    request.subscribe({
      next: response => {
        if (response.status >= 200 && response.status < 300) {
          const wasEditing = this.appointmentBeingEdited !== null;
          this.appointmentBeingEdited = null;
          this.appointmentBeingEditedId = null;
          this.nextClientAppointments$ = this.appointementsService.getNextClientAppointments(user.id);
          this.getAvailableDatesForBarberForm.reset();
          this.createAppointmentForm.reset();
          this.showBookingDetails = false;
          this.showPopup(
            wasEditing ? 'Appointment updated successfully!' : 'Appointment created successfully!',
            'success-snackbar'
          );
        }
      },
      error: err => this.showEndpointError(err)
    });
  }

  editAppointment(appointmentId: number) {
    this.appointmentBeingEditedId = appointmentId;
    this.appointmentBeingCancelledId = null;

    this.appointementsService.getAppointmentById(appointmentId).subscribe({
      next: appointment => {
        this.appointmentBeingEdited = appointment;

        const scheduleDate = new Date(appointment.scheduleDate);
        const pad = (value: number) => value.toString().padStart(2, '0');

        this.getAvailableDatesForBarberForm.patchValue({
          barberId: appointment.barberId,
          scheduleDate,
        });
        this.createAppointmentForm.patchValue({
          serviceId: appointment.serviceType,
          description: appointment.description,
          scheduleHour: `${pad(scheduleDate.getHours())}:${pad(scheduleDate.getMinutes())}`,
        });
        this.selectedTabIndex = 0;
      },
      error: err => this.showEndpointError(err),
    });
  }

  cancelAppointment(appointmentId: number) {
    this.appointmentPendingCancellationId = appointmentId;
  }

  dismissCancellation() {
    this.appointmentPendingCancellationId = null;
  }

  confirmCancellation() {
    const appointmentId = this.appointmentPendingCancellationId;
    if (appointmentId === null) {
      return;
    }

    this.appointmentPendingCancellationId = null;
    this.appointmentBeingCancelledId = appointmentId;
    this.appointmentBeingEditedId = null;

    this.appointementsService.deleteAppointment(appointmentId).subscribe({
      next: response => {
        if (response.status >= 200) {
          this.nextClientAppointments$ = this.appointementsService.getNextClientAppointments(this.userId);
          this.appointmentBeingCancelledId = null;
          this.showPopup('Appointment cancelled successfully!', 'success-snackbar');
        }
      },
      error: err => {
        this.appointmentBeingCancelledId = null;
        this.showEndpointError(err);
      }
    });
  }

  private showEndpointError(err: HttpErrorResponse) {
    if (err.status === 412) {
      this.showPopup('The request could not be completed.', 'error-snackbar');
      return;
    }

    this.showPopup('An error occurred. Please try again.', 'error-snackbar');
  }

  private showPopup(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
