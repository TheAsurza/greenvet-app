import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCita } from '../../core/models';

@Pipe({
  name: 'estadoBadge',
  standalone: false
})
export class EstadoBadgePipe implements PipeTransform {
  transform(estado: EstadoCita | string | undefined | null): { clase: string; icono: string; etiqueta: string } {
    switch (estado) {
      case EstadoCita.PENDIENTE:
        return {
          clase: 'bg-warning-subtle text-warning-emphasis border border-warning',
          icono: 'bi-hourglass-split',
          etiqueta: 'Pendiente'
        };
      case EstadoCita.CONFIRMADA:
        return {
          clase: 'bg-info-subtle text-info-emphasis border border-info',
          icono: 'bi-calendar-check',
          etiqueta: 'Confirmada'
        };
      case EstadoCita.ATENDIDA:
        return {
          clase: 'bg-success-subtle text-success-emphasis border border-success',
          icono: 'bi-check-circle-fill',
          etiqueta: 'Atendida'
        };
      case EstadoCita.CANCELADA:
        return {
          clase: 'bg-danger-subtle text-danger-emphasis border border-danger',
          icono: 'bi-x-circle-fill',
          etiqueta: 'Cancelada'
        };
      default:
        return {
          clase: 'bg-secondary-subtle text-secondary-emphasis border border-secondary',
          icono: 'bi-question-circle',
          etiqueta: String(estado ?? 'Desconocido')
        };
    }
  }
}

