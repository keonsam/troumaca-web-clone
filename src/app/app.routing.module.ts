import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LobbyHomeComponent} from "./lobby-home/lobby.home.component";
import {PageNotFoundComponent} from "./page-not-found/page.not.found.component";
import {AssetComponent} from "../assets/asset.component";
import {AssetTypeComponent} from "../asset-types/asset.type.component";
import {AttributeComponent} from "../attributes/attribute.component";
import {AssetTypeClassComponent} from "../asset-type-classes/asset.type.class.component";
import {SiteComponent} from "../site/site.component";
import {AssetListComponent} from "../assets/asset-list/asset.list.component";
import {AssetCreationComponent} from "../assets/asset-creation/asset.creation.component";
import {AssetTypeListComponent} from "../asset-types/asset-type-list/asset.type.list.component";
import {AssetTypeCreationComponent} from "../asset-types/asset-type-creation/asset.type.creation.component";
import {AssetTypeClassCreationComponent} from "../asset-type-classes/asset-type-class-creation/asset.type.class.creation.component";
import {AssetTypeClassListComponent} from "../asset-type-classes/asset-type-class-list/asset.type.class.list.component";
import {AssetTypeClassEditComponent} from "../asset-type-classes/asset-type-class-edit/asset.type.class.edit.component";
import {AttributeListComponent} from "../attributes/attribute-list/attribute.list.component";
import {AttributeCreationComponent} from "../attributes/attribute-creation/attribute.creation.component";
import {AttributeEditComponent} from "../attributes/attribute-edit/attribute.edit.component";
import {SitePostOfficeBoxCreationComponent} from "../site/site-post-office-box-creation/site.post.office.box.creation.component";
import {SitePostOfficeBoxEditComponent} from "../site/site-post-office-box-edit/site.post.office.box.edit.component";
import {SitePostOfficeBoxListComponent} from "../site/site-post-office-box-list/site.post.office.box.list.component";
import {SiteEmailCreationComponent} from "../site/site-email-creation/site.email.creation.component";
import {SiteEmailEditComponent} from "../site/site-email-edit/site.email.edit.component";
import {SiteEmailListComponent} from "../site/site-email-list/site.email.list.component";
import {SiteWebCreationComponent} from "../site/site-web-creation/site.web.creation.component";
import {SiteWebEditComponent} from "../site/site-web-edit/site.web.edit.component";
import {SiteWebListComponent} from "../site/site-web-list/site.web.list.component";
import {SitePhoneListComponent} from "../site/site-phone-list/site.phone.list.component";
import {SiteStreetAddressCreationComponent} from "../site/site-street-address-creation/site.street.address.creation.component";
import {SiteStreetAddressEditComponent} from "../site/site-street-address-edit/site.street.address.edit.component";
import {SiteStreetAddressListComponent} from "../site/site-street-address-list/site.street.address.list.component";
import {SitePhoneCreationComponent} from "../site/site-phone-creation/site.phone.creation.component";
import {SitePhoneEditComponent} from "../site/site-phone-edit/site.phone.edit.component";
import {PartyComponent} from "../parties/party.component";
import {OrganizationListComponent} from "../parties/organizations/organization-list/organization.list.component";
import {OrganizationCompanyComponent} from "../parties/organizations/organization-company/organization.company.component";
import {CustomerListComponent} from "../parties/customers/customer-list/customer.list.component";
import {VendorListComponent} from "../parties/vndors/vendor-list/vendor.list.component";
import {EmployeeListComponent} from "../parties/employees/employee-list/employee.list.component";
import {UserListComponent} from "../parties/users/user-list/user.list.component";
import {ContractComponent} from "../contracts/contract.component";
import {OrderListComponent} from "../contracts/orders/order.list.component";
import {SaleOrderListComponent} from "../contracts/orders/sales/sale.order.list.component";
import {PurchaseOrderListComponent} from "../contracts/orders/purchases/purchase.order.list.component";
import {OrderFulfillmentListComponent} from "../contracts/orders/fulfillments/order.fulfillment.list.component";
import {ContractListComponent} from "../contracts/contract-list/contract.list.component";
import {OrderInvoiceListComponent} from "../contracts/orders/invoices/order.invoice.list.component";
import {QuoteComponent} from "../quotes/quote.component";
import {QuoteListComponent} from "../quotes/quote-list/quote.list.component";

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: LobbyHomeComponent },
  { path: 'assets', component: AssetComponent, children: [
    { path: '',redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: AssetListComponent },
    { path: 'create', component: AssetCreationComponent }
  ]},
  { path: 'asset-types', component: AssetTypeComponent,  children: [
      { path: '',redirectTo: 'listing', pathMatch: 'full' },
      { path: 'listing', component: AssetTypeListComponent },
      { path: 'create', component: AssetTypeCreationComponent }
  ]},
  { path: 'asset-type-classes', component: AssetTypeClassComponent, children:[
    { path: '', redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: AssetTypeClassListComponent },
    { path: 'create', component: AssetTypeClassCreationComponent },
    { path: ':assetTypeClassId/edit', component: AssetTypeClassEditComponent }
  ]},
  { path: 'attributes', component: AttributeComponent, children:[
      { path: '', redirectTo: 'listing', pathMatch: 'full' },
      { path: 'listing', component: AttributeListComponent },
      { path: 'create', component: AttributeCreationComponent },
      { path: ':attributeId/edit', component: AttributeEditComponent }
  ]},
  { path: 'sites', component: SiteComponent, children:[
    { path: '', redirectTo: 'street-addresses', pathMatch: 'full' },
    { path: 'street-addresses', component: SiteStreetAddressListComponent },
    { path: 'street-addresses/:siteId/edit', component: SiteStreetAddressEditComponent },
    { path: 'street-addresses/create', component: SiteStreetAddressCreationComponent },
    { path: 'post-office-boxes', component: SitePostOfficeBoxListComponent },
    { path: 'post-office-boxes/create', component: SitePostOfficeBoxCreationComponent },
    { path: 'post-office-boxes/:siteId/edit', component: SitePostOfficeBoxEditComponent },
    { path: 'emails', component: SiteEmailListComponent },
    { path: 'emails/create', component: SiteEmailCreationComponent },
    { path: 'emails/:siteId/edit', component: SiteEmailEditComponent },
    { path: 'web-sites', component: SiteWebListComponent },
    { path: 'web-sites/create', component: SiteWebCreationComponent },
    { path: 'web-sites/:siteId/edit', component: SiteWebEditComponent },
    { path: 'phones', component: SitePhoneListComponent},
    { path: 'phones/:siteId/edit', component: SitePhoneEditComponent},
    { path: 'phones/create', component: SitePhoneCreationComponent}
  ]},
  { path: 'parties', component: PartyComponent, children:[
    { path: '', redirectTo: 'organizations/company', pathMatch: 'full' },
    { path: 'organizations/company', component: OrganizationCompanyComponent, data:{menuName:'organizations-menu'} },
    { path: 'users', component: UserListComponent, data:{menuName:'users-menu'} }
  ]},
  { path: 'contracts', component: ContractComponent, children:[
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'listing', component: ContractListComponent, data:{menuName:'orders-menu'}},
    { path: 'orders', component: OrderListComponent, data:{menuName:'orders-menu'}},
    { path: 'sales', component: SaleOrderListComponent, data:{menuName:'orders-menu'}},
    { path: 'purchases', component: PurchaseOrderListComponent, data:{menuName:'orders-menu'}},
    { path: 'fulfillments', component: OrderFulfillmentListComponent, data:{menuName:'orders-menu'}},
    { path: 'invoices', component: OrderInvoiceListComponent, data:{menuName:'orders-menu'}}
  ]},
  {
    path: 'quotes', component: QuoteComponent, children:[
      { path: '', redirectTo: 'listing', pathMatch: 'full' },
      { path: 'listing', component: QuoteListComponent, data:{menuName:'quotes-menu'}},
    ]
  },
  {path: 'shipping', redirectTo: '/contracts/sales', pathMatch: 'full'},
  {path: 'receiving', redirectTo: '/contracts/purchases', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

// { path: 'organizations', component: OrganizationListComponent },
// { path: 'customers', component: CustomerListComponent },
// { path: 'vendors', component: VendorListComponent },
// { path: 'vendors/employees', component: EmployeeListComponent },
// { path: 'customers/employees', component: EmployeeListComponent },

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
