import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AssetTypeClassComponent} from "./asset.type.class.component";


export const assetTypeClassRoutes: Routes = [
  {path: '', redirectTo: 'asset-types', pathMatch: 'full'},
  {path: 'asset-types', component: AssetTypeClassComponent}
];

export const assetTypeClassRouting: ModuleWithProviders = RouterModule.forChild(assetTypeClassRoutes);