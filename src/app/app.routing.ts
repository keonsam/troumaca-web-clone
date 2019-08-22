import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page.not.found.component';
import {AUTHENTICATION} from './routes';

const appRoutes: Routes = [
  {path: '', redirectTo: AUTHENTICATION, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [ ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
