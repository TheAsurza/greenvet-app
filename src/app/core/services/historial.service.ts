import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { HistorialAtencion } from '../models';
import { generarSemillasOctubre } from './seeds/octubre-seeds';

const STORAGE_KEY_HISTORIAL = 'vet_historial_v3';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private historialSubject = new BehaviorSubject<HistorialAtencion[]>([]);
  public historial$: Observable<HistorialAtencion[]> = this.historialSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.cargarDatosIniciales();
  }

  private cargarDatosIniciales(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const raw = localStorage.getItem(STORAGE_KEY_HISTORIAL);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        this.historialSubject.next(parsed);
        return;
      } catch (e) {
        console.error('Error al parsear historial de localStorage, cargando semillas...', e);
      }
    }

    const semillas = this.generarSemillas();
    this.guardarEnStorage(semillas);
    this.historialSubject.next(semillas);
  }

  private generarSemillas(): HistorialAtencion[] {
    return generarSemillasOctubre().historial;
  }

  private guardarEnStorage(historial: HistorialAtencion[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY_HISTORIAL, JSON.stringify(historial));
    }
  }

  public getHistorial(): HistorialAtencion[] {
    return this.historialSubject.value;
  }

  public getHistorialPorMascota(mascotaId: string): HistorialAtencion[] {
    return this.historialSubject.value
      .filter(h => h.mascotaId === mascotaId)
      .sort((a, b) => new Date(b.fechaAtencion).getTime() - new Date(a.fechaAtencion).getTime());
  }

  public registrarAtencion(atencion: HistorialAtencion): void {
    const actualizados = [atencion, ...this.historialSubject.value];
    this.guardarEnStorage(actualizados);
    this.historialSubject.next(actualizados);
  }
}

