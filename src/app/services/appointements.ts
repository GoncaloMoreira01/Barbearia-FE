import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../constants/ApiEndpointsEnum';
import { HttpClient } from '@angular/common/http';
import { ApointmentObject, FutureAndOldAppointmentsObject, AppointmentInfo, UpdateAppointmentObject } from '../models/AppointmentObjects';


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
    return this.http.post(ApiEndpoints.POST_CREATE_APPOINTMENT, appointmentCreateObject, {
      observe: 'response',
      responseType: 'text',
    });
  }

  updateAppointment(appointmentUpdateObject: UpdateAppointmentObject) {
    return this.http.put(ApiEndpoints.PUT_UPDATE_APPOINTMENT, appointmentUpdateObject, {
      observe: 'response',
      responseType: 'text',
    });
  }

  deleteAppointment(appointmentId: number) {
    return this.http.delete(ApiEndpoints.DELETE_APPOINTMENT, {
      params: {
        id: appointmentId
      },
      observe: 'response',
      responseType: 'text',
    });
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

  getAppointmentById(appointmentId: number) {
  return this.http.get<AppointmentInfo>(ApiEndpoints.GET_APPOINTMENT_BY_ID, {
      params: {
        id: appointmentId,
      },
    }
  );
}

  getBarberAppointments(barberId: number, scheduleDate: Date) {
    const localScheduleDate = [
      scheduleDate.getFullYear(),
      String(scheduleDate.getMonth() + 1).padStart(2, '0'),
      String(scheduleDate.getDate()).padStart(2, '0'),
    ].join('-');

    return this.http.get<FutureAndOldAppointmentsObject[]>(ApiEndpoints.GET_BARBER_APPOINTMENTS, {
      params: {
        barberId: barberId,
        scheduleDate: localScheduleDate,
      }
    });
  }
}
