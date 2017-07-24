import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {PageNotFoundComponent} from "./page.not.found.component";


const pageNotFoundRoutes: Routes = [
  {path: 'page-not-found', component: PageNotFoundComponent},
];

export const pageNotFoundRouting: ModuleWithProviders = RouterModule.forChild(pageNotFoundRoutes);