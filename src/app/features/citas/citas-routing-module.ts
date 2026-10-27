import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CitasPageComponent } from './components/citas-page/citas-page';

const routes: Routes = [
  { path: '', component: CitasPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasRoutingModule {}
