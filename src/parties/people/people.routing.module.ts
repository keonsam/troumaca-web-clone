import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {PEOPLE} from '../../app/routes';
import { AuthGuard } from '../../auth-guard/auth.guard';
import {PeopleComponent} from './people.component';
import {PeopleFormComponent} from './people-form/people.form.component';
import {PeopleListComponent} from './people-list/people.list.component';
import {PeoplesResolve} from './people-list/peoples.resolve';
import {PeopleResolve} from './people-form/people.resolve';

export const routes: Routes = [
  {
    path: '', component: PeopleComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: '', redirectTo: `/${PEOPLE}/listing`, pathMatch: 'full'},
      {path: `create`, component: PeopleFormComponent},
      {path: `listing`, component: PeopleListComponent, resolve: { users: PeoplesResolve }},
      { path: ':partyId/edit', component: PeopleFormComponent, resolve: { user: PeopleResolve } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
