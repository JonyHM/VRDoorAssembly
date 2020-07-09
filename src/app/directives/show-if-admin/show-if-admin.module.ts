import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowIfAdminDirective } from './show-if-admin.directive';

@NgModule({
  declarations: [ShowIfAdminDirective],
  imports: [
    CommonModule
  ]
})
export class ShowIfAdminModule { }
