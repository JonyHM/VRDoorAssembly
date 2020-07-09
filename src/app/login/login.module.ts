import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
