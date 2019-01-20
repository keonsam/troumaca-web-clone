import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { UnitOfMeasureComponent } from './unit.of.measure.component';
import {unitOfMeasureServiceProvider } from './unit.of.measure.service.provider';
import {unitOfMeasureRepositoryProvider} from '../adapter/unit-of-measures/unit.of.measure.repository.adapter.provider';
import {unitOfMeasureClientProvider} from '../client/unit-of-measure/unit.of.measure.client.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UnitOfMeasureComponent
  ],
  providers: [
    unitOfMeasureServiceProvider,
    unitOfMeasureRepositoryProvider,
    unitOfMeasureClientProvider,
  ],
  exports: [
    UnitOfMeasureComponent
  ]
})
export class UnitOfMeasureModule {}
