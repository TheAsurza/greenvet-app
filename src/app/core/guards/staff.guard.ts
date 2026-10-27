import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthStaffService } from '../services/auth-staff.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {
  constructor(
    private authStaffService: AuthStaffService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authStaffService.isAuthenticated()) {
      return true;
    }

    // Redirigir a la pantalla de acceso de personal clínico guardando la URL intentada
    this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
