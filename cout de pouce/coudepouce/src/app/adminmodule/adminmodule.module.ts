import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminmoduleRoutingModule } from './adminmodule-routing.module';
import { AdminComponent } from '../admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminmoduleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminmoduleModule { }
