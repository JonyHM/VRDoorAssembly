import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenComponent } from './screen.component';
import { ScreenRoutingModule } from './screen-routing.module';
import { ShowIfAdminModule } from '../directives/show-if-admin/show-if-admin.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScreenComponent],
  imports: [
    CommonModule,
    ScreenRoutingModule,
    ShowIfAdminModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScreenModule { }
