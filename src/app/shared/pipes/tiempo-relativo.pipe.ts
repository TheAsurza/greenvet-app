import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoRelativo',
  standalone: false
})
export class TiempoRelativoPipe implements PipeTransform {
  transform(valor: string | Date | undefined | null): string {
    if (!valor) return 'Sin fecha';

    const fecha = new Date(valor);
    if (isNaN(fecha.getTime())) return 'Fecha inválida';

    const hoy = new Date();
    const esMismoDia = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);

    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);

    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${horas}:${minutos}`;

    if (esMismoDia(fecha, hoy)) {
      return `Hoy a las ${horaFormateada}`;
    } else if (esMismoDia(fecha, manana)) {
      return `Mañana a las ${horaFormateada}`;
    } else if (esMismoDia(fecha, ayer)) {
      return `Ayer a las ${horaFormateada}`;
    }

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio} ${horaFormateada}`;
  }
}

