import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AttributeComponent} from './attribute.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {AttributeListComponent} from './attribute-list/attribute.list.component';
import {AttributeTopMenuComponent} from './attribute-top-menu/attribute.top.menu.component';
import {SearchModule} from '../search/search.module';
import {PagingModule} from '../paging/paging.module';
import {attributeServiceProvider} from './attribute.service.provider';
import { AttributeRoutingModule } from './attribute.routing.module';
import { AttributeFormComponent } from './attribute-form/attribute.form.component';
import { attributeResolveProvider } from './attribute.resolve.provider';
import { UnitOfMeasureModule } from '../unit-of-measure/unit.of.measure.module';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {attributeRepositoryProvider} from '../adapter/attributes/attributes.repository.adapter.provider';
import {attributeClientProvider} from '../client/attribute/attribute.client.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    SearchModule,
    PagingModule,
    AttributeRoutingModule,
    UnitOfMeasureModule,
    DeleteModalModule
  ],
  declarations: [
    AttributeComponent,
    AttributeFormComponent,
    AttributeListComponent,
    AttributeTopMenuComponent
  ],
  providers: [attributeServiceProvider,
    attributeResolveProvider,
    attributeRepositoryProvider,
    attributeClientProvider,
  ],
  exports: [
    AttributeFormComponent
  ]
})
export class AttributeModule {}
