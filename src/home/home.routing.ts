import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomeComponent} from './home.component';


const homeRoutes: Routes = [
  {path: 'home', component: HomeComponent},
];

export const homeRouting: ModuleWithProviders = RouterModule.forRoot(homeRoutes);
