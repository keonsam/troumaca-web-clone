import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../app/material.module';
import {DialogErrorComponent} from './dialog-error/dialog.error.component';
import {DialogSuccessComponent} from './dialog-success/dialog.success.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    DialogErrorComponent,
    DialogSuccessComponent
  ],
  exports: [
    DialogErrorComponent,
    DialogSuccessComponent
  ],
})
export class DialogModule { }
