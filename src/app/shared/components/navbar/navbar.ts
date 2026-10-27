import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStaffService, StaffUsuario } from '../../../core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  standalone: false
})
export class NavbarComponent {
  public clinicaNombre = 'GreenVet';

  constructor(
    private router: Router,
    private authStaffService: AuthStaffService
  ) {}

  public get esRutaAdministrativa(): boolean {
    return this.router.url.startsWith('/admin');
  }

  public get estaAutenticadoStaff(): boolean {
    return this.authStaffService.isAuthenticated();
  }

  public get staffActual(): StaffUsuario | null {
    return this.authStaffService.getStaffActual();
  }

  public cerrarSesionStaff(): void {
    this.authStaffService.logout();
    this.router.navigate(['/portal']);
  }
}
