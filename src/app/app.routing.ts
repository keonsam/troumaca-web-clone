import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page.not.found.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);