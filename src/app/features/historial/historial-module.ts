import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { HistorialPageComponent } from './components/historial-page/historial-page';

@NgModule({
  declarations: [HistorialPageComponent],
  imports: [CommonModule, HistorialRoutingModule, SharedModule],
})
export class HistorialModule {}
