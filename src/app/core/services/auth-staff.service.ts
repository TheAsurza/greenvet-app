import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface StaffUsuario {
  id: string;
  nombreCompleto: string;
  rol: string;
  email: string;
  colegiatura?: string;
}

const STORAGE_KEY_STAFF = 'vet_staff_session_v1';

@Injectable({
  providedIn: 'root'
})
export class AuthStaffService {
  private staffSubject = new BehaviorSubject<StaffUsuario | null>(null);
  public staff$: Observable<StaffUsuario | null> = this.staffSubject.asObservable();

  // Lista de personal autorizado de la clínica GreenVet
  public readonly PERSONAL_AUTORIZADO: StaffUsuario[] = [
    {
      id: 'staff-1',
      nombreCompleto: 'Dra. Camila Soto',
      rol: 'Médica Veterinaria Directora',
      email: 'camila.soto@greenvet.pe',
      colegiatura: 'CMVP 8945'
    },
    {
      id: 'staff-2',
      nombreCompleto: 'Dr. Alejandro Rivas',
      rol: 'Especialista en Cirugía y Felinos',
      email: 'alejandro.rivas@greenvet.pe',
      colegiatura: 'CMVP 7632'
    },
    {
      id: 'staff-3',
      nombreCompleto: 'Dra. Andrea Beltrán',
      rol: 'Medicina Preventiva y Exóticos',
      email: 'andrea.beltran@greenvet.pe',
      colegiatura: 'CMVP 9120'
    },
    {
      id: 'staff-4',
      nombreCompleto: 'Lic. Roberto Gómez',
      rol: 'Administrador de Recepción y Turnos',
      email: 'roberto.gomez@greenvet.pe'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.cargarSesionAlmacenada();
  }

  private cargarSesionAlmacenada(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const raw = localStorage.getItem(STORAGE_KEY_STAFF);
    if (raw) {
      try {
        const usuario = JSON.parse(raw);
        this.staffSubject.next(usuario);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY_STAFF);
      }
    }
  }

  public isAuthenticated(): boolean {
    return this.staffSubject.value !== null;
  }

  public getStaffActual(): StaffUsuario | null {
    return this.staffSubject.value;
  }

  /**
   * Autenticación con credenciales (Usuario + Contraseña)
   * Credenciales válidas: cualquier usuario registrado o admin/1234
   */
  public login(usuarioOEmail: string, clave: string): boolean {
    const user = usuarioOEmail.trim().toLowerCase();
    const pass = clave.trim();

    if ((user === 'admin' || user === 'staff' || user === 'doctor') && (pass === '1234' || pass === 'admin2026' || pass === 'admin')) {
      const staffPrincipal = this.PERSONAL_AUTORIZADO[0];
      this.establecerSesion(staffPrincipal);
      return true;
    }

    const encontrado = this.PERSONAL_AUTORIZADO.find(
      s => s.email.toLowerCase() === user || s.nombreCompleto.toLowerCase().includes(user)
    );

    if (encontrado && (pass === '1234' || pass === 'admin2026' || pass === 'admin')) {
      this.establecerSesion(encontrado);
      return true;
    }

    return false;
  }

  /**
   * Autenticación rápida de perfiles para demostración y testing
   */
  public loginRapido(staffId: string): void {
    const staff = this.PERSONAL_AUTORIZADO.find(s => s.id === staffId) || this.PERSONAL_AUTORIZADO[0];
    this.establecerSesion(staff);
  }

  private establecerSesion(usuario: StaffUsuario): void {
    this.staffSubject.next(usuario);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY_STAFF, JSON.stringify(usuario));
    }
  }

  public logout(): void {
    this.staffSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY_STAFF);
    }
  }
}
