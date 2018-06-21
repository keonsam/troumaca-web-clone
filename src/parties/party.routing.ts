import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PartyComponent} from './party.component';
// import {MeComponent} from "./me/me.component";
// import {PersonComponent} from "./creation/person.component";
// {path: 'persons/create-new', component:PersonComponent},
// ,
// {path: 'persons/me', component:MeComponent}

export const personsRoutes: Routes = [
  {path: '', redirectTo: 'persons', pathMatch: 'full'},
  {path: 'persons', component: PartyComponent}
];

export const personsRouting: ModuleWithProviders = RouterModule.forChild(personsRoutes);
