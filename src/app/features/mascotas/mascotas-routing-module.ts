import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MascotasPageComponent } from './components/mascotas-page/mascotas-page';

const routes: Routes = [
  { path: '', component: MascotasPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotasRoutingModule {}
