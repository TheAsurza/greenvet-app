import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffGuard } from '../../core/guards/staff.guard';
import { PublicLayoutComponent } from '../../shared/components/public-layout/public-layout';
import { AdminLoginComponent } from './components/admin-login/admin-login';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';

const routes: Routes = [
  // 1. Pantalla de Login Institucional (con marco público estándar)
  {
    path: 'login',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: AdminLoginComponent }
    ]
  },

  // 2. Intranet Clínica con Sidebar y Topbar (Protegida por StaffGuard)
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [StaffGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      {
        path: 'citas',
        loadChildren: () => import('../citas/citas-module').then(m => m.CitasModule)
      },
      {
        path: 'mascotas',
        loadChildren: () => import('../mascotas/mascotas-module').then(m => m.MascotasModule)
      },
      {
        path: 'historial',
        loadChildren: () => import('../historial/historial-module').then(m => m.HistorialModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
