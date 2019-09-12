// import {Routes, RouterModule} from '@angular/router';
// import {NgModule} from '@angular/core';
// import {OrganizationComponent} from './organization.component';
// import {OrganizationCreateComponent} from './organization-create/organization.create.component';
// import {ORGANIZATION} from '../../app/routes';
// import { AuthGuard } from '../../auth-guard/auth.guard';
// import { OrganizationCompanyComponent} from './organization-company/organization.company.component';
// import { CompanyResolve } from './organization-company/organization.company.resolve';
//
// export const routes: Routes = [
//   {
//     path: '', component: OrganizationComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
//       {path: '', redirectTo: `/${ORGANIZATION}/profile`, pathMatch: 'full'},
//       {
//         path: `profile`, component: OrganizationCompanyComponent,
//         resolve: {
//           company: CompanyResolve
//         }
//       },
//       {path: `create`, component: OrganizationCreateComponent},
//     ]
//   }
// ];
//
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class OrganizationRoutingModule { }
