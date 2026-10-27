import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthStaffService, StaffUsuario, CitasService } from '../../../../core/services';
import { EstadoCita } from '../../../../core/models';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss'],
  standalone: false
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  public clinicaNombre = 'GreenVet';
  public sidebarAbierto = false;
  public fechaActual = new Date();
  public citasPendientesHoy = 0;
  public tituloVistaActual = 'Dashboard Clínico';
  public subtituloVistaActual = 'Resumen general y métricas operativas de la clínica';

  private subscripciones: Subscription = new Subscription();

  constructor(
    public authStaffService: AuthStaffService,
    private citasService: CitasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Contar citas pendientes de hoy para el badge del sidebar
    this.subscripciones.add(
      this.citasService.citas$.subscribe(citas => {
        const hoyIso = new Date().toISOString().split('T')[0];
        this.citasPendientesHoy = citas.filter(c =>
          c.fechaHora && c.fechaHora.startsWith(hoyIso) &&
          (c.estado === EstadoCita.PENDIENTE || c.estado === EstadoCita.CONFIRMADA)
        ).length;
      })
    );

    // 2. Actualizar título según la ruta activa
    this.actualizarTitulos(this.router.url);
    this.subscripciones.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.actualizarTitulos(event.urlAfterRedirects || event.url);
          this.sidebarAbierto = false; // Cerrar sidebar al navegar en móviles
        })
    );

    // 3. Reloj en tiempo real
    const timer = setInterval(() => {
      this.fechaActual = new Date();
    }, 1000);
    this.subscripciones.add({ unsubscribe: () => clearInterval(timer) });
  }

  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  public get staffActual(): StaffUsuario | null {
    return this.authStaffService.getStaffActual();
  }

  public toggleSidebar(): void {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

  public cerrarSidebar(): void {
    this.sidebarAbierto = false;
  }

  public cerrarSesion(): void {
    this.authStaffService.logout();
    this.router.navigate(['/portal']);
  }

  private actualizarTitulos(url: string): void {
    if (url.includes('/admin/citas')) {
      this.tituloVistaActual = 'Agenda & Citas Médicas';
      this.subtituloVistaActual = 'Control de turnos, triaje y prevención de colisiones horarias';
    } else if (url.includes('/admin/mascotas')) {
      this.tituloVistaActual = 'Padrón de Pacientes & Dueños';
      this.subtituloVistaActual = 'Fichas polimórficas (Caninos, Felinos y Exóticos) y propietarios';
    } else if (url.includes('/admin/historial')) {
      this.tituloVistaActual = 'Expedientes & Historial Clínico';
      this.subtituloVistaActual = 'Evoluciones médicas, signos vitales, diagnósticos y recetas';
    } else {
      this.tituloVistaActual = 'Dashboard Clínico';
      this.subtituloVistaActual = 'Resumen general y métricas operativas de la clínica';
    }
  }
}
