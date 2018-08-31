import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { UnitOfMeasureComponent } from './unit.of.measure.component';
import { Ng2CompleterModule } from "ng2-completer";
import {unitOfMeasureServiceProvider } from "./unit.of.measure.service.provider";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule
  ],
  declarations: [
    UnitOfMeasureComponent
  ],
  providers: [unitOfMeasureServiceProvider],
  exports: [
    UnitOfMeasureComponent
  ]
})
export class UnitOfMeasureModule {}
