import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cita, EstadoCita, MotivoConsulta } from '../models';
import { generarSemillasOctubre } from './seeds/octubre-seeds';

const STORAGE_KEY_CITAS = 'vet_citas_v3';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private citasSubject = new BehaviorSubject<Cita[]>([]);
  public citas$: Observable<Cita[]> = this.citasSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.cargarDatosIniciales();
  }

  private cargarDatosIniciales(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const raw = localStorage.getItem(STORAGE_KEY_CITAS);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        this.citasSubject.next(parsed);
        return;
      } catch (e) {
        console.error('Error al parsear citas de localStorage, cargando semillas...', e);
      }
    }

    const semillas = this.generarSemillas();
    this.guardarEnStorage(semillas);
    this.citasSubject.next(semillas);
  }

  private generarSemillas(): Cita[] {
    return generarSemillasOctubre().citas;
  }

  private guardarEnStorage(citas: Cita[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY_CITAS, JSON.stringify(citas));
    }
  }

  public getCitas(): Cita[] {
    return this.citasSubject.value;
  }

  public getCitaById(id: string): Cita | undefined {
    return this.citasSubject.value.find(c => c.id === id);
  }

  public agendarCita(cita: Cita): boolean {
    // Validar conflicto de horario para el mismo veterinario o turno (mismo slot exacto)
    const conflicto = this.citasSubject.value.some(
      c => c.fechaHora === cita.fechaHora && c.estado !== EstadoCita.CANCELADA
    );

    if (conflicto) {
      return false; // Indicador de colisión de horario
    }

    const actualizadas = [cita, ...this.citasSubject.value];
    this.guardarEnStorage(actualizadas);
    this.citasSubject.next(actualizadas);
    return true;
  }

  public cambiarEstado(id: string, nuevoEstado: EstadoCita): void {
    const actualizadas = this.citasSubject.value.map(c =>
      c.id === id ? { ...c, estado: nuevoEstado } : c
    );
    this.guardarEnStorage(actualizadas);
    this.citasSubject.next(actualizadas);
  }

  public cancelarCita(id: string): void {
    this.cambiarEstado(id, EstadoCita.CANCELADA);
  }

  public getCitasPorMascota(mascotaId: string): Cita[] {
    return this.citasSubject.value.filter(c => c.mascotaId === mascotaId);
  }
}

