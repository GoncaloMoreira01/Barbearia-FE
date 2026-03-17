export enum BarberServiceType {
  Hair = "HAIR",
  Beard = "BEARD",
  Both = "BOTH"
}

export const barberServices = [
  { type: BarberServiceType.Hair, id: 1, name: "Corte Cabelo", price: 12 },
  { type: BarberServiceType.Beard, id: 2, name: "Corte Barba", price: 6 },
  { type: BarberServiceType.Both, id: 3, name: "Corte Cabelo + Barba", price: 18 }
];