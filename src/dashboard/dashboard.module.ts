import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MenuModule} from '../menu/menu.module';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {DashboardLayoutComponent} from './dashboard.layout.component';
import { SuccessMessageComponent} from './success-message/success-message.component';
import {DeleteModalComponent} from './delete-modal/delete.modal.component';
import {MaterialModule} from '../app/material.module';
import {ErrorMessageComponent} from './error-message/error.message.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FlexLayoutModule,
    DashboardRoutingModule,
    MenuModule,
    MaterialModule
  ],
  declarations: [
    DashboardLayoutComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    DeleteModalComponent
  ],
  entryComponents: [DeleteModalComponent],
})
export class DashboardModule { }
