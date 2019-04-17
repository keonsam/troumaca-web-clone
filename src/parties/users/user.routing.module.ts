import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { USER} from '../../app/routes';
import { AuthGuard } from '../../auth-guard/auth.guard';
import {UserMeComponent} from './user-me/user.me.component';
import {UserComponent} from './user.component';
import {UserMeResolve} from './user-me/user.me.resolve';

export const routes: Routes = [
  {
    path: '', component: UserComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: '', redirectTo: `/${USER}/profile`, pathMatch: 'full'},
      {
        path: `profile`, component: UserMeComponent,
        resolve: {
          userMe: UserMeResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
