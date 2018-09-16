import {NgModule} from '@angular/core';
import {SearchComponent} from './search.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports:      [
    CommonModule
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
