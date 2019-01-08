import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FrontHomeComponent} from '../front-home/front.home.component';
import {MaterialModule} from "../app/material.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    FrontHomeComponent,
  ],
  providers: [],
  exports: [
    FrontHomeComponent,
  ]
})
export class FrontHomeModule {}
