import {NgModule} from '@angular/core';
import {SearchComponent} from './search.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchComponent
  ],
  exports:      [
    SearchComponent
  ],
  providers: [
  ]
})
export class SearchModule { }
