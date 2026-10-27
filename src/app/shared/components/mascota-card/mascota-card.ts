import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mascota, EspecieMascota, SexoMascota } from '../../../core/models';

@Component({
  selector: 'app-mascota-card',
  templateUrl: './mascota-card.html',
  styleUrls: ['./mascota-card.scss'],
  standalone: false
})
export class MascotaCardComponent {
  @Input({ required: true }) mascota!: Mascota;
  @Input() mostrarAcciones = true;

  @Output() verHistorial = new EventEmitter<Mascota>();
  @Output() agendarCita = new EventEmitter<Mascota>();
  @Output() verDetalle = new EventEmitter<Mascota>();

  public EspecieMascota = EspecieMascota;
  public SexoMascota = SexoMascota;

  onVerHistorial(): void {
    this.verHistorial.emit(this.mascota);
  }

  onAgendarCita(): void {
    this.agendarCita.emit(this.mascota);
  }

  onVerDetalle(): void {
    this.verDetalle.emit(this.mascota);
  }
}
