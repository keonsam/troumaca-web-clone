import {NgModule} from '@angular/core';
import {PagingComponent} from './paging.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../app/material.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    PagingComponent
  ],
  exports: [
    PagingComponent
  ],
  providers: [
  ]
})
export class PagingModule { }
