import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrandFormComponent} from './brand.form.component';
import {MaterialModule} from '../../app/material.module';
import {brandServiceProvider} from '../brand.service.provider';
import {brandRepositoryProvider} from '../../adapter/brands/brand.repository.adapter.provider';
import {brandClientProvider} from '../../client/brands/brand.client.provider';
import {brandResolveProvider} from '../brand.resolve.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    BrandFormComponent,
  ],
  providers: [
    brandResolveProvider,
    brandServiceProvider,
    brandRepositoryProvider,
    brandClientProvider
  ],
  exports: [
    BrandFormComponent,
  ]
})

export class BrandFormModule { }
