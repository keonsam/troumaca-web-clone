import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardLayoutComponent} from './dashboard.layout.component';
import {ASSET, LOBBY, MANAGE} from '../app/routes';
import {AuthGuard} from '../auth-guard/auth.guard';

export const routes: Routes = [
  { path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: `/${LOBBY}/${ASSET}`, pathMatch: 'full' },
      { path: ASSET, loadChildren: () => import('../assets/asset.module').then(m => m.AssetModule), },
      { path: MANAGE, loadChildren: () => import('../manage/manage.module').then(m => m.ManageModule), },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
