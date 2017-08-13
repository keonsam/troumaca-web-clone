import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {MeComponent} from "./me.component";


const meRoutes: Routes = [
  {path: '', redirectTo: 'me', pathMatch: 'full'},
  {path: 'me', component: MeComponent},
];

export const meRouting: ModuleWithProviders = RouterModule.forChild(meRoutes);