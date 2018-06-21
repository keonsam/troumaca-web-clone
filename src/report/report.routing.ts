import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ReportComponent} from './report.component';


const reportRoutes: Routes = [
  {path: 'report', component: ReportComponent},
];

export const reportRouting: ModuleWithProviders = RouterModule.forChild(reportRoutes);
