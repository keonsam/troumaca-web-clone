import {Routes, RouterModule} from '@angular/router';
import {AssetTypeClassComponent} from './asset.type.class.component';
import {NgModule} from '@angular/core';
import {AssetTypeClassListComponent} from './asset-type-class-list/asset.type.class.list.component';
import {AssetTypeClassCreationComponent} from './asset-type-class-creation/asset.type.class.creation.component';
import {AssetTypeClassEditComponent} from './asset-type-class-edit/asset.type.class.edit.component';


export const routes: Routes = [
  { path: '', component: AssetTypeClassComponent, children: [
      { path: '', redirectTo: 'asset-type-classes/listing', pathMatch: 'full' },
      { path: 'listing', component: AssetTypeClassListComponent },
      { path: 'create', component: AssetTypeClassCreationComponent },
      { path: ':assetTypeClassId/edit', component: AssetTypeClassEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetTypeClassRoutingModule { }
