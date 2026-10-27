import { Mascota } from './mascota.model';

export enum EstadoCita {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  ATENDIDA = 'ATENDIDA',
  CANCELADA = 'CANCELADA'
}

export enum MotivoConsulta {
  CONSULTA_GENERAL = 'Consulta General',
  VACUNACION = 'Vacunación y Desparasitación',
  CONTROL_RUTINA = 'Control de Rutina',
  CIRUGIA = 'Procedimiento Quirúrgico',
  URGENCIA = 'Urgencia Médica'
}

export interface Cita {
  id: string;
  mascotaId: string;
  mascotaNombre?: string;
  propietarioNombre?: string;
  especie?: string;
  fechaHora: string; // ISO 8601 string para facilitar serialización (YYYY-MM-DDTHH:mm)
  motivo: MotivoConsulta;
  estado: EstadoCita;
  notas?: string;
  veterinarioAsignado?: string;
}

