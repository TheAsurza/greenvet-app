import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { AdminLoginComponent } from './components/admin-login/admin-login';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminLayoutComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
