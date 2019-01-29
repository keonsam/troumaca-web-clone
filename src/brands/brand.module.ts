import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagingModule} from '../paging/paging.module';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {BrandComponent} from './brand.component';
import {BrandFormComponent} from './brand-form/brand.form.component';
import {MaterialModule} from '../app/material.module';
import {BrandListComponent} from './brand-listing/brand.list.component';
import {brandServiceProvider} from './brand.service.provider';
import {brandRepositoryProvider} from '../adapter/brands/brand.repository.adapter.provider';
import {brandClientProvider} from '../client/brands/brand.client.provider';

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
    BrandComponent,
    BrandFormComponent,
    BrandListComponent,
  ],
  providers: [
    brandServiceProvider,
    brandRepositoryProvider,
    brandClientProvider
  ],
  exports: []
})

export class BrandModule { }
