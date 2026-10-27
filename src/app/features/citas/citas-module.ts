import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { CitasPageComponent } from './components/citas-page/citas-page';

@NgModule({
  declarations: [CitasPageComponent],
  imports: [CommonModule, CitasRoutingModule, SharedModule],
})
export class CitasModule {}
