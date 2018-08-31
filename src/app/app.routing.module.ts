import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page.not.found.component';

import {HomeComponent} from '../home/home.component';
import {FrontHomeComponent} from '../home/front-home/front.home.component';
import {LobbyHomeComponent} from '../home/lobby-home/lobby.home.component';

import {AuthGuard} from '../auth-guard/auth.guard';
import {UnAuthGuard} from '../auth-guard/unAuth.guard';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, children: [
    { path: '', canActivate: [UnAuthGuard], component: FrontHomeComponent },
    { path: 'lobby', canActivate: [AuthGuard], component: LobbyHomeComponent },
  ]},
  { path: 'access-roles', loadChildren: '../access-roles/access.role.module#AccessRoleModule' },
  { path: 'asset-type-classes', loadChildren: '../asset-type-classes/asset.type.class.module#AssetTypeClassModule' },
  { path: 'asset-types', loadChildren: '../asset-types/asset.type.module#AssetTypesModule' },
  { path: 'assets', loadChildren: '../assets/asset.module#AssetModule' },
  { path: 'attributes', loadChildren: '../attributes/attribute.module#AttributeModule' },
  { path: 'authentication', loadChildren: '../authentication/authentication.module#AuthenticationModule' },
  { path: 'depreciation', loadChildren: '../depreciation/depreciation.module#DepreciationModule' },
  { path: 'parties', loadChildren: '../parties/party.module#PartyModule' },
  { path: 'sites', loadChildren: '../site/site.module#SiteModule' },
  { path: '**', component: PageNotFoundComponent }
  // { path: 'contracts', component: ContractComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
  //   { path: '', redirectTo: 'orders', pathMatch: 'full' },
  //   { path: 'listing', component: ContractListComponent, data: {menuName: 'orders-menu'}},
  //   { path: 'orders', component: OrderListComponent, data: {menuName: 'orders-menu'}},
  //   { path: 'sales', component: SaleOrderListComponent, data: {menuName: 'orders-menu'}},
  //   { path: 'purchases', component: PurchaseOrderListComponent, data: {menuName: 'orders-menu'}},
  //   { path: 'fulfillments', component: OrderFulfillmentListComponent, data: {menuName: 'orders-menu'}},
  //   { path: 'invoices', component: OrderInvoiceListComponent, data: {menuName: 'orders-menu'}}
  // ]},
  // { path: 'quotes', canActivate: [AuthGuard], canActivateChild: [AuthGuard], component: QuoteComponent, children: [
  //   { path: '', redirectTo: 'listing', pathMatch: 'full' },
  //   { path: 'listing', component: QuoteListComponent, data: {menuName: 'quotes-menu'}},
  // ]},
  // { path: 'shipments', component: ShipmentComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
  //   { path: '', redirectTo: 'listing', pathMatch: 'full' },
  //   { path: 'listing', component: ShipmentListComponent, data: {menuName: 'shipments-menu'}},
  //   { path: 'create', component: ShipmentCreationComponent, data: {menuName: 'shipments-menu'} },
  //   { path: ':shipmentId/edit', component: ShipmentEditComponent, data: {menuName: 'shipments-menu'} }
  // ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
