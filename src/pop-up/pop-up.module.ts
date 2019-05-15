import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorComponent} from './error/error.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SuccessComponent} from './success/success.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    ErrorComponent,
    SuccessComponent
  ],
  exports: [
    ErrorComponent,
    SuccessComponent
  ]
})

export class PopUpModule { }
