import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AssetTypeComponent} from "./asset.type.component";


const assetTypeRoutes: Routes = [
  {path: 'asset-type', component: AssetTypeComponent},
];

export const assetTypeRouting: ModuleWithProviders = RouterModule.forChild(assetTypeRoutes);