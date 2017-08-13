import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {ActivityComponent} from "./activity.component";


const activityRoutes: Routes = [
  {path: 'activity', component: ActivityComponent},
];

export const activityRouting: ModuleWithProviders = RouterModule.forChild(activityRoutes);