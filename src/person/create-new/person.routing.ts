import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {PersonComponent} from "./person.component";


const peronRoutes: Routes = [
  {path: '', redirectTo: 'create-new', pathMatch: 'full'},
  {path: 'create-new', component: PersonComponent},
];

export const peronRouting: ModuleWithProviders = RouterModule.forChild(peronRoutes);