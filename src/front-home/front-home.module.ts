import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FrontHomeComponent} from '../front-home/front.home.component';
import {MaterialModule} from "../app/material.module";
import {StepperComponent} from './onboarding/stepper.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    FrontHomeComponent,
    StepperComponent
  ],
  providers: [],
  exports: [
    FrontHomeComponent,
  ]
})
export class FrontHomeModule {}
