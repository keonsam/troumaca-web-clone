import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MenuModule} from '../menu/menu.module';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {DashboardLayoutComponent} from './dashboard.layout.component';
import { SuccessMessageComponent} from './success-message/success-message.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FlexLayoutModule,
    DashboardRoutingModule,
    MenuModule,
  ],
  declarations: [
    DashboardLayoutComponent,
    SuccessMessageComponent
  ]
})
export class DashboardModule { }
