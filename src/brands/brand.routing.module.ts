// import {NgModule} from '@angular/core';
// import {RouterModule, Routes} from '@angular/router';
// import {BrandComponent} from './brand.component';
// import {AuthGuard} from '../auth-guard/auth.guard';
// import {BrandFormComponent} from './brand-form/brand.form.component';
// import {BrandResolve} from './brand.resolve';
// import {BrandListComponent} from './brand-listing/brand.list.component';
// import {BrandsResolve} from './brands.resolve';
// import {BRANDS} from '../app/routes';
//
// export const routes: Routes = [
//   { path: '', component: BrandComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
//       { path: '', redirectTo: `/${BRANDS}/listing`, pathMatch: 'full' },
//       { path: 'listing', component: BrandListComponent, resolve: { brands: BrandsResolve } },
//       { path: 'create', component: BrandFormComponent },
//       { path: ':brandId/edit', component: BrandFormComponent, resolve: {brand: BrandResolve} },
//     ]}
// ];
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
//
// export class BrandRoutingModule { }
