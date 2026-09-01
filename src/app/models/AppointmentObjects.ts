export interface ApointmentObject {
  clientId: number;
  barberId: number;
  // Appointment times are local wall-clock times, not UTC instants.
  // Sending an ISO string without a timezone preserves the selected time.
  scheduleDate: string;
  description: string;
  serviceType: number;
}

export interface FutureAndOldAppointmentsObject {
  barberName: string;
  scheduleDate: Date;
  description: string;
  serviceType: number;
}
