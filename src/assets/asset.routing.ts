import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AssetComponent} from "./asset.component";


export const assetsRoutes: Routes = [
  {path: '', redirectTo: 'assets', pathMatch: 'full'},
  {path: 'assets', component: AssetComponent}
];

export const assetsRouting: ModuleWithProviders = RouterModule.forChild(assetsRoutes);