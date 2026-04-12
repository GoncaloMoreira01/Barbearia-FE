export interface ApointmentObject {
  clientId: number;
  barberId: number;
  scheduleDate: Date;
  description: string;
  serviceType: number;
}

export interface FutureAndOldAppointmentsObject {
  barberName: string;
  scheduleDate: Date;
  description: string;
  serviceType: number;
}