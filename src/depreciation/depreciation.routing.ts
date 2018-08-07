import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DepreciationComponent} from "./depreciation.component";


const depreciationRoutes: Routes = [
  {path: 'depreciation', component: DepreciationComponent},
];

export const depreciationRouting: ModuleWithProviders = RouterModule.forRoot(depreciationRoutes);
