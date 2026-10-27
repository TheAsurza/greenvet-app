export interface SignosVitales {
  pesoKg: number;
  temperaturaCelsius: number;
  frecuenciaCardiacaBpm?: number;
}

export interface HistorialAtencion {
  id: string;
  mascotaId: string;
  citaId?: string;
  fechaAtencion: string; // ISO 8601 YYYY-MM-DD
  motivoConsulta: string;
  diagnostico: string;
  tratamientoRecetado: string;
  signosVitales: SignosVitales;
  fechaProximaCita?: string; // YYYY-MM-DD
  observaciones?: string;
  veterinarioTratante: string;
}

