import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {PersonsComponent} from "./persons.component";
import {MeComponent} from "./me/me.component";
import {PersonComponent} from "./create-new/person.component";

export const personsRoutes: Routes = [
  {path: '', redirectTo: 'persons', pathMatch: 'full'},
  {path: 'persons', component: PersonsComponent},
  {path: 'persons/create-new', component:PersonComponent},
  {path: 'persons/me', component:MeComponent}
];

export const personsRouting: ModuleWithProviders = RouterModule.forChild(personsRoutes);