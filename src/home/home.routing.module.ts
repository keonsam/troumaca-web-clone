import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LobbyHomeComponent} from "./lobby-home/lobby.home.component";

export const routes: Routes = [
  { path: '', component: LobbyHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
