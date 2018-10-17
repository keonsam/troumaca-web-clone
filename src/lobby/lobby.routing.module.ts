import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LobbyComponent } from './lobby.component';
import {AuthGuard} from '../auth-guard/auth.guard';

export const routes: Routes = [
  { path: '', component: LobbyComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LobbyRoutingModule { }
