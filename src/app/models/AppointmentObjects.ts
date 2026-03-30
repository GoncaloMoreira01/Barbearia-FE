export interface ApointmentCreateObject {
  clientId: number;
  barberId: number;
  scheduleDate: Date;
  description: string;
  serviceType: number;
}