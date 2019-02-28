import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { USER} from '../../app/routes';
import { AuthGuard } from '../../auth-guard/auth.guard';
import {UserMeComponent} from './user-me/user.me.component';
import {UserFormComponent} from './user-form/user.form.component';
import {UserListComponent} from './user-list/user.list.component';
import {UserComponent} from './user.component';
import {UserResolve} from './user.resolve';
import {UsersResolve} from './user-list/users.resolve';
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
      },
      {path: `create`, component: UserFormComponent},
      {path: `listing`, component: UserListComponent, resolve: { users: UsersResolve }},
      { path: ':partyId/edit', component: UserFormComponent, resolve: { user: UserResolve } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
