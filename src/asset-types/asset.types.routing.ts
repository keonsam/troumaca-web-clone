import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AssetTypesComponent} from "./asset.types.component";


export const assetTypesRoutes: Routes = [
  {path: '', redirectTo: 'asset-types', pathMatch: 'full'},
  {path: 'asset-types', component: AssetTypesComponent}
];

export const assetTypesRouting: ModuleWithProviders = RouterModule.forChild(assetTypesRoutes);