import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Propietario } from '../../../core/models';

@Component({
  selector: 'app-dueno-lookup-modal',
  templateUrl: './dueno-lookup-modal.html',
  styleUrls: ['./dueno-lookup-modal.scss'],
  standalone: false
})
export class DuenoLookupModalComponent {
  @Input() visible: boolean = false;
  @Input() propietarios: Propietario[] = [];

  @Output() cerrar = new EventEmitter<void>();
  @Output() seleccionar = new EventEmitter<Propietario>();
  @Output() registrarNuevo = new EventEmitter<void>();

  public busquedaTexto: string = '';

  public get propietariosFiltrados(): Propietario[] {
    if (!this.busquedaTexto.trim()) {
      return this.propietarios;
    }
    const q = this.busquedaTexto.toLowerCase().trim();
    return this.propietarios.filter(p =>
      p.nombreCompleto.toLowerCase().includes(q) ||
      p.documentoIdentidad.includes(q) ||
      p.telefono.includes(q)
    );
  }

  public onSeleccionar(prop: Propietario): void {
    this.seleccionar.emit(prop);
    this.busquedaTexto = '';
  }

  public onCerrar(): void {
    this.cerrar.emit();
    this.busquedaTexto = '';
  }

  public onRegistrarNuevo(): void {
    this.registrarNuevo.emit();
    this.busquedaTexto = '';
  }
}

