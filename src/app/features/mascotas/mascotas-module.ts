import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasRoutingModule } from './mascotas-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { MascotasPageComponent } from './components/mascotas-page/mascotas-page';

@NgModule({
  declarations: [MascotasPageComponent],
  imports: [CommonModule, MascotasRoutingModule, SharedModule],
})
export class MascotasModule {}
