import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalClientesRoutingModule } from './portal-clientes-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { PortalPageComponent } from './components/portal-page/portal-page';

@NgModule({
  declarations: [PortalPageComponent],
  imports: [
    CommonModule,
    PortalClientesRoutingModule,
    SharedModule
  ]
})
export class PortalClientesModule { }
