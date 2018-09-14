import {RouterModule, Routes} from '@angular/router';
import {CreateProfileComponent} from './create.profile.component';
import {NgModule} from '@angular/core';
import {UserResolve} from '../parties/users/user.resolve';

export const routes: Routes = [
  {path: '', component: CreateProfileComponent, resolve: { userResponse: UserResolve}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreateProfileRoutingModule { }
