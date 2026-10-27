export interface Propietario {
  id: string;
  nombreCompleto: string;
  documentoIdentidad: string;
  telefono: string;
  email: string;
  direccion?: string;
  fechaRegistro: Date;
}

