import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MenuModule} from '../menu/menu.module';
import {ManageRoutingModule} from './manage.routing.module';
import {ManageComponent} from './manage.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FlexLayoutModule,
    ManageRoutingModule,
    MenuModule,
  ],
  declarations: [
    ManageComponent
  ]
})
export class ManageModule {

}
