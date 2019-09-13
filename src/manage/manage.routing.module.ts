import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../auth-guard/auth.guard';
import {ManageComponent} from './manage.component';

export const routes: Routes = [
  { path: '', component: ManageComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      // { path: '', redirectTo: `/${ASSET}/listing`, pathMatch: 'full' },
      // { path: 'listing', component: AssetListComponent },
      // { path: 'create', component: AssetFormComponent },
      // { path: ':assetId/edit', component: AssetFormComponent, resolve: { asset: AssetResolve} }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManageRoutingModule { }
