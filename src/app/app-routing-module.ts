import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './shared/components/public-layout/public-layout';

const routes: Routes = [
  // 1. Ámbito Público (Portal de Clientes - Reserva de Citas Online con PublicLayout)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'portal', pathMatch: 'full' },
      {
        path: 'portal',
        loadChildren: () => import('./features/portal-clientes/portal-clientes-module').then(m => m.PortalClientesModule)
      }
    ]
  },

  // 2. Módulo de Administración e Intranet Clínica (gestiona su propio shell en AdminModule)
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule)
  },

  // Redirecciones retrocompatibles hacia el panel interno
  { path: 'citas', redirectTo: 'admin/citas' },
  { path: 'mascotas', redirectTo: 'admin/mascotas' },
  { path: 'historial', redirectTo: 'admin/historial' },

  // Ruta por defecto para cualquier ruta no reconocida
  { path: '**', redirectTo: 'portal' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
