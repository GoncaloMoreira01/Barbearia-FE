import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';
import { HttpClient } from '@angular/common/http';
import { ApointmentObject, FutureAndOldAppointmentsObject } from '../models/AppointmentObjects';


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

  createAppointment(appointmentCreateObject: ApointmentObject) {
    return this.http.post<string>(ApiEndpoints.POST_CREATE_APPOINTMENT, appointmentCreateObject);
  }

  getOldClientAppointments(clientId: number) {
    return this.http.get<FutureAndOldAppointmentsObject[]>(ApiEndpoints.GET_OLD_CLIENT_APPOINTMENTS, {
      params: {
        clientId: clientId
      }
    });
  }

  getNextClientAppointments(clientId: number) {
    return this.http.get<FutureAndOldAppointmentsObject[]>(ApiEndpoints.GET_NEXT_CLIENT_APPOINTMENTS, {
      params: {
        clientId: clientId
      }
    });
  }
}
