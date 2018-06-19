import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SiteComponent} from './site.component';


const siteRoutes: Routes = [
  {path: 'site', component: SiteComponent},
];

export const siteRouting: ModuleWithProviders = RouterModule.forChild(siteRoutes);
