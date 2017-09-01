import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AssetsComponent} from "./assets.component";


export const assetsRoutes: Routes = [
  {path: '', redirectTo: 'assets', pathMatch: 'full'},
  {path: 'assets', component: AssetsComponent}
];

export const assetsRouting: ModuleWithProviders = RouterModule.forChild(assetsRoutes);