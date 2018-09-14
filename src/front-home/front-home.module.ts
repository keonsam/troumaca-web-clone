import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FrontHomeComponent} from '../front-home/front.home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
