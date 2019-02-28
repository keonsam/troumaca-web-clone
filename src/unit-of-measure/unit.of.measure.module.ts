import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagingModule} from '../paging/paging.module';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {MaterialModule} from '../app/material.module';
import { UnitOfMeasureListComponent} from './unit-of-measure-listing/unit.of.measure.list.component';
import {unitOfMeasureServiceProvider} from './unit.of.measure.service.provider';
import {unitOfMeasuresResolveProvider} from './unit.of.measures.resolve.provider';
import { unitOfMeasureRepositoryProvider } from '../adapter/unit-of-measures/unit.of.measure.repository.adapter.provider';
import { unitOfMeasureClientProvider } from '../client/unit-of-measure/unit.of.measure.client.provider';
import {UnitOfMeasureFormModule} from './unit-of-measure-form/unit.of.measure.form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    DeleteModalModule,
    MaterialModule,
    UnitOfMeasureFormModule
  ],
  declarations: [
    UnitOfMeasureListComponent,
  ],
  exports: [
    UnitOfMeasureListComponent,
  ],
  providers: [
    unitOfMeasuresResolveProvider,
    unitOfMeasureServiceProvider,
    unitOfMeasureRepositoryProvider,
    unitOfMeasureClientProvider
  ],
})

export class UnitOfMeasureModule { }
