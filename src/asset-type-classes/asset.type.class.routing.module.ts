import {Routes, RouterModule} from '@angular/router';
import {AssetTypeClassComponent} from './asset.type.class.component';
import {NgModule} from '@angular/core';
import {AssetTypeClassListComponent} from './asset-type-class-list/asset.type.class.list.component';
import { AssetTypeClassFormComponent } from './asset-type-class-form/asset.type.class.form.component';
import {AssetTypeClassResolve} from './asset.type.class.resolve';
import {AuthGuard} from '../auth-guard/auth.guard';

export const routes: Routes = [
  { path: '', component: AssetTypeClassComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: '/asset-type-classes/listing', pathMatch: 'full' },
      { path: 'listing', component: AssetTypeClassListComponent },
      { path: 'create', component: AssetTypeClassFormComponent },
      { path: ':assetTypeClassId/edit', component: AssetTypeClassFormComponent, resolve: {assetTypeClassResponse: AssetTypeClassResolve} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetTypeClassRoutingModule { }
