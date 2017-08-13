import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AssetComponent} from "./asset.component";


const assetRoutes: Routes = [
  {path: 'asset', component: AssetComponent},
];

export const assetRouting: ModuleWithProviders = RouterModule.forChild(assetRoutes);