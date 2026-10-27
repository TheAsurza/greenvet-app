import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Pipes
import { TiempoRelativoPipe } from './pipes/tiempo-relativo.pipe';
import { EstadoBadgePipe } from './pipes/estado-badge.pipe';

// Directives
import { CitaUrgenteDirective } from './directives/cita-urgente.directive';

// Components
import { NavbarComponent } from './components/navbar/navbar';
import { MascotaCardComponent } from './components/mascota-card/mascota-card';
import { DuenoLookupModalComponent } from './components/dueno-lookup-modal/dueno-lookup-modal';
import { PublicLayoutComponent } from './components/public-layout/public-layout';

const COMPONENTES = [
  NavbarComponent,
  MascotaCardComponent,
  DuenoLookupModalComponent,
  PublicLayoutComponent
];

const PIPES = [
  TiempoRelativoPipe,
  EstadoBadgePipe
];

const DIRECTIVAS = [
  CitaUrgenteDirective
];

@NgModule({
  declarations: [
    ...COMPONENTES,
    ...PIPES,
    ...DIRECTIVAS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...COMPONENTES,
    ...PIPES,
    ...DIRECTIVAS
  ]
})
export class SharedModule {}
