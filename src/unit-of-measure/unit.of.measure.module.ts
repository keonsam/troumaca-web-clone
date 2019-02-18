import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagingModule} from '../paging/paging.module';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import { UnitOfMeasureFormComponent} from './unit-of-measure-form/unit.of.measure.form.component';
import {MaterialModule} from '../app/material.module';
import { UnitOfMeasureListComponent} from './unit-of-measure-listing/unit.of.measure.list.component';
import {unitOfMeasureServiceProvider} from './unit.of.measure.service.provider';
import {unitOfMeasuresResolveProvider} from './unit.of.measures.resolve.provider';
import {unitOfMeasureResolveProvider} from './unit.of.measure.resolve.provider';
import { unitOfMeasureRepositoryProvider } from '../adapter/unit-of-measures/unit.of.measure.repository.adapter.provider';
import { unitOfMeasureClientProvider } from '../client/unit-of-measure/unit.of.measure.client.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    DeleteModalModule,
    MaterialModule
  ],
  declarations: [
    UnitOfMeasureFormComponent,
    UnitOfMeasureListComponent,
  ],
  exports: [
    UnitOfMeasureFormComponent,
    UnitOfMeasureListComponent,
  ],
  providers: [
    unitOfMeasureResolveProvider,
    unitOfMeasuresResolveProvider,
    unitOfMeasureServiceProvider,
    unitOfMeasureRepositoryProvider,
    unitOfMeasureClientProvider
  ],
})

export class UnitOfMeasureModule { }
