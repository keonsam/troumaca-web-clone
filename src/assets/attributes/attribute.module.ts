import {NgModule} from '@angular/core';
import {attributeServiceProvider} from './attribute.service.provider';
import {AttributeSelectModalComponent} from './attributes-select-modal-component/attribute.select.modal.component';
import {AttributeCreateModalComponent} from './attributes-create-modal-component/attribute.create.modal.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app/material.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    FlexLayoutModule,
    ScrollingModule
  ],
  exports: [
    AttributeSelectModalComponent,
    AttributeCreateModalComponent,
  ],
  entryComponents: [
    AttributeSelectModalComponent,
    AttributeCreateModalComponent,
  ],
  declarations: [
    AttributeSelectModalComponent,
    AttributeCreateModalComponent,
  ],
  providers: [
    attributeServiceProvider,
  ]
})
export class AttributeModule { }
