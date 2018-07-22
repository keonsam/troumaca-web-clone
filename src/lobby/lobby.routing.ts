import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { LobbyComponent } from './lobby.component';


const homeRoutes: Routes = [
  {path: 'home', component: LobbyComponent},
];

export const lobbyRouting: ModuleWithProviders = RouterModule.forRoot(homeRoutes);
