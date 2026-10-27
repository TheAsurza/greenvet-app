import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mascota, Canino, Felino, Exotico, EspecieMascota, SexoMascota, Propietario, FichaClinicaBasica } from '../models';
import { generarPadronMascotas } from './seeds/octubre-seeds';

export interface MascotaRaw {
  id: string;
  nombre: string;
  especie: EspecieMascota;
  raza: string;
  sexo: SexoMascota;
  fechaNacimiento: string | Date;
  pesoActualKg: number;
  propietario: Propietario;
  fichaClinica?: Partial<FichaClinicaBasica>;
}

const STORAGE_KEY_MASCOTAS = 'vet_mascotas_v3';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private mascotasSubject = new BehaviorSubject<Mascota[]>([]);
  public mascotas$: Observable<Mascota[]> = this.mascotasSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.cargarDatosIniciales();
  }

  private cargarDatosIniciales(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const raw = localStorage.getItem(STORAGE_KEY_MASCOTAS);
    if (raw) {
      try {
        const parsed: MascotaRaw[] = JSON.parse(raw);
        const mascotasReconstruidas = parsed.map((m: MascotaRaw) => this.reconstruirMascota(m));
        this.mascotasSubject.next(mascotasReconstruidas);
        return;
      } catch (e) {
        console.error('Error al parsear mascotas de localStorage, cargando semillas...', e);
      }
    }

    const semillas = this.generarSemillas();
    this.guardarEnStorage(semillas);
    this.mascotasSubject.next(semillas);
  }

  private reconstruirMascota(obj: MascotaRaw): Mascota {
    if (obj.especie === EspecieMascota.CANINO) {
      return new Canino(
        obj.id,
        obj.nombre,
        obj.raza,
        obj.sexo,
        new Date(obj.fechaNacimiento),
        obj.pesoActualKg,
        obj.propietario,
        obj.fichaClinica
      );
    } else if (obj.especie === EspecieMascota.FELINO) {
      return new Felino(
        obj.id,
        obj.nombre,
        obj.raza,
        obj.sexo,
        new Date(obj.fechaNacimiento),
        obj.pesoActualKg,
        obj.propietario,
        obj.fichaClinica
      );
    }
    return new Exotico(
      obj.id,
      obj.nombre,
      obj.raza,
      obj.sexo,
      new Date(obj.fechaNacimiento),
      obj.pesoActualKg,
      obj.propietario,
      obj.fichaClinica
    );
  }

  private generarSemillas(): Mascota[] {
    return generarPadronMascotas();
  }

  private guardarEnStorage(mascotas: Mascota[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY_MASCOTAS, JSON.stringify(mascotas));
    }
  }

  public getMascotas(): Mascota[] {
    return this.mascotasSubject.value;
  }

  public getMascotaById(id: string): Mascota | undefined {
    return this.mascotasSubject.value.find(m => m.id === id);
  }

  public agregarMascota(mascota: Mascota): void {
    const actuales = [...this.mascotasSubject.value, mascota];
    this.guardarEnStorage(actuales);
    this.mascotasSubject.next(actuales);
  }

  public actualizarMascota(mascota: Mascota): void {
    const actuales = this.mascotasSubject.value.map(m => m.id === mascota.id ? mascota : m);
    this.guardarEnStorage(actuales);
    this.mascotasSubject.next(actuales);
  }

  public eliminarMascota(id: string): void {
    const filtradas = this.mascotasSubject.value.filter(m => m.id !== id);
    this.guardarEnStorage(filtradas);
    this.mascotasSubject.next(filtradas);
  }

  public getPropietarios(): Propietario[] {
    const mapa = new Map<string, Propietario>();
    for (const m of this.mascotasSubject.value) {
      if (m.propietario && !mapa.has(m.propietario.id)) {
        mapa.set(m.propietario.id, m.propietario);
      }
    }
    return Array.from(mapa.values());
  }

  public getMascotasPorPropietario(propietarioId: string): Mascota[] {
    return this.mascotasSubject.value.filter(m => m.propietario.id === propietarioId);
  }
}

