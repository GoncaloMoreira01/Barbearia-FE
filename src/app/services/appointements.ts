import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';
import { HttpClient } from '@angular/common/http';
import { ApointmentCreateObject } from '../models/AppointmentObjects';


@Injectable({
  providedIn: 'root',
})
export class Appointements {
    constructor(private http: HttpClient) {}

  getAvailableDatesForBarber(barberId: number, scheduleDate: string) {
      return this.http.get<string[]>(ApiEndpoints.GET_AVAILABLE_DATES_FOR_BARBER, {
        params: {
          barberId: barberId,
          scheduleDate: scheduleDate
        }
      });
  }

  createAppointment(appointmentCreateObject: ApointmentCreateObject) {
    console.log("aaa")
    return this.http.post<string>(ApiEndpoints.POST_CREATE_APPOINTMENT, appointmentCreateObject);
  }
}
