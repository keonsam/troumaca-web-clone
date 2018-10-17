import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssetTypeClassComponent} from './asset.type.class.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import { AssetTypeClassFormComponent} from './asset-type-class-form/asset.type.class.form.component';
import {AssetTypeClassListComponent} from './asset-type-class-list/asset.type.class.list.component';
import {AssetTypeClassTopMenuComponent} from './asset-type-class-top-menu/asset-type-class-top-menu.component';
import {assetTypeClassServiceProvider} from './asset.type.class.service.provider';
import {PagingModule} from '../paging/paging.module';
import {SearchModule} from '../search/search.module';
import {Ng2CompleterModule} from 'ng2-completer';
import { AssetTypeClassRoutingModule } from './asset.type.class.routing.module';
import { assetTypeClassResolveProvider } from './asset.type.class.resolve.provider';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {attributeServiceProvider} from '../attributes/attribute.service.provider';
import {AttributeModule} from '../attributes/attribute.module';
import {authGuardProvider} from "../auth-guard/auth.guard.provider";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    MenuModule,
    PagingModule,
    SearchModule,
    AssetTypeClassRoutingModule,
    DeleteModalModule,
    AttributeModule
  ],
  declarations: [
    AssetTypeClassComponent,
    AssetTypeClassListComponent,
    AssetTypeClassFormComponent,
    AssetTypeClassTopMenuComponent,
  ],
  providers: [assetTypeClassServiceProvider, assetTypeClassResolveProvider, attributeServiceProvider, authGuardProvider],
  exports: []
})
export class AssetTypeClassModule {}
