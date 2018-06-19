import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {WorkOrderComponent} from './work.order.component';


const workOrderRoutes: Routes = [
  {path: 'work-order', component: WorkOrderComponent},
];

export const workOrderRouting: ModuleWithProviders = RouterModule.forChild(workOrderRoutes);
