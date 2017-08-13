import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page.not.found.component";
import {AppComponent} from "./app.component";

// {path: '', component: AppComponent},
const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);