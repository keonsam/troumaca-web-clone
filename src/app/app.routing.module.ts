import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PageNotFoundComponent} from "./page-not-found/page.not.found.component";
import {AssetComponent} from "../assets/asset.component";
import {AssetTypeComponent} from "../asset-types/asset.type.component";
import {AttributeComponent} from "../attributes/attribute.component";
import {AssetTypeClassComponent} from "../asset-type-classes/asset.type.class.component";
import {SiteComponent} from "../site/site.component";
import {AssetEditComponent} from "../assets/asset-edit/asset.edit.component";
import {AssetListComponent} from "../assets/asset-list/asset.list.component";
import {AssetCreationComponent} from "../assets/asset-creation/asset.creation.component";
import {AssetTypeListComponent} from "../asset-types/asset-type-list/asset.type.list.component";
import {AssetTypeCreationComponent} from "../asset-types/asset-type-creation/asset.type.creation.component";
import {AssetTypeEditComponent} from "../asset-types/asset-type-edit/asset.type.edit.component";
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
import {OrganizationCompanyComponent} from "../parties/organizations/organization-company/organization.company.component";
import {OrganizationListComponent} from "../parties/organizations/organization-list/organization.list.component";
import {OrganizationCreationComponent} from "../parties/organizations/organization-creation/organization.creation.component";
import {OrganizationEditComponent} from "../parties/organizations/organization-edit/organization.edit.component";
import {UserListComponent} from "../parties/users/user-list/user.list.component";
import {UserCreationComponent} from "../parties/users/user-creation/user.creation.component";
import {UserEditComponent} from "../parties/users/user-edit/user.edit.component";
import {CreateAccountComponent} from "../parties/create-profile/create.profile.component";
import {UserMeComponent} from "../parties/users/user-me/user.me.component";
import {ContractComponent} from "../contracts/contract.component";
import {OrderListComponent} from "../contracts/orders/order.list.component";
import {SaleOrderListComponent} from "../contracts/orders/sales/sale.order.list.component";
import {PurchaseOrderListComponent} from "../contracts/orders/purchases/purchase.order.list.component";
import {OrderFulfillmentListComponent} from "../contracts/orders/fulfillments/order.fulfillment.list.component";
import {ContractListComponent} from "../contracts/contract-list/contract.list.component";
import {OrderInvoiceListComponent} from "../contracts/orders/invoices/order.invoice.list.component";
import {QuoteComponent} from "../quotes/quote.component";
import {QuoteListComponent} from "../quotes/quote-list/quote.list.component";
import {ShipmentListComponent} from "../shipments/shipment-list/shipment.list.component";
import {ShipmentCreationComponent} from "../shipments/shipment-creation/shipment.creation.component";
import {ShipmentEditComponent} from "../shipments/shipment-edit/shipment.edit.component";
import {ShipmentComponent} from "../shipments/shipment.component";
import {AuthenticationComponent} from "../authentication/authentication.component";
import {LoginComponent} from "../authentication/login/login.component";
import {ForgotPasswordComponent} from "../authentication/forgot-password/forgot.password.component";
import {RegisterComponent} from "../authentication/register/register.component";
import {HomeComponent} from "../home/home.component";
import {FrontHomeComponent} from "../home/front-home/front.home.component";
import {LobbyHomeComponent} from "../home/lobby-home/lobby.home.component";
import {PhoneVerificationComponent} from "../authentication/phone-verification/phone.verification.component";
import {EmailVerificationComponent} from "../authentication/email-verification/email.verification.component";
import {AuthGuard} from "../auth-guard/auth.guard";
//access Roles
import {AccessRoleComponent} from "../access-roles/access.role.component";
import {AccessRoleCreationComponent} from "../access-roles/access-role-creation/access.role.creation.component";
import {AccessRoleEditComponent} from "../access-roles/access-role-edit/access.role.edit.component";
import {AccessRoleListComponent} from "../access-roles/access-role-list/access.role.list.component";
import {PermissionCreationComponent} from "../access-roles/permissions/permission-creation/permission.creation.component";
import {PermissionEditComponent} from "../access-roles/permissions/permission-edit/permission.edit.component";
import {PermissionListComponent} from "../access-roles/permissions/permission-list/permission.list.component";
import {ResourceCreationComponent} from "../access-roles/resources/resource-creation/resource.creation.component";
import {ResourceEditComponent} from "../access-roles/resources/resource-edit/resource.edit.component";
import {ResourceListComponent} from "../access-roles/resources/resource-list/resource.list.component";
import {ResourceTypeCreationComponent} from "../access-roles/resource-types/resorce.type.creation/resource.type.creation.component";
import {ResourceTypeEditComponent} from "../access-roles/resource-types/resource.type.edit/resource.type.edit.component";
import {ResourceTypeListComponent} from "../access-roles/resource-types/resource.type.list/resource.type.list.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, children: [
    { path: '', canActivate: [AuthGuard], component: FrontHomeComponent },
    { path: 'lobby', canActivate: [AuthGuard], component: LobbyHomeComponent },
  ]},
  { path: 'authentication', component: AuthenticationComponent, canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'phone-verification/:credentialConfirmationId', component: PhoneVerificationComponent },
    { path: 'email-verification/:credentialConfirmationId', component: EmailVerificationComponent }
  ]},
  { path: 'assets', component: AssetComponent, canActivate: [AuthGuard], children: [
    { path: '',redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: AssetListComponent },
    { path: 'create', component: AssetCreationComponent },
    { path: ':assetId/edit', component: AssetEditComponent }
  ]},
  { path: 'asset-types', component: AssetTypeComponent, canActivate: [AuthGuard], children: [
    { path: '',redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: AssetTypeListComponent },
    { path: 'create', component: AssetTypeCreationComponent },
    { path: ':assetTypeId/edit', component: AssetTypeEditComponent },
  ]},
  { path: 'asset-type-classes', component: AssetTypeClassComponent, canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: AssetTypeClassListComponent },
    { path: 'create', component: AssetTypeClassCreationComponent },
    { path: ':assetTypeClassId/edit', component: AssetTypeClassEditComponent }
  ]},
  { path: 'attributes', component: AttributeComponent, canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: AttributeListComponent },
    { path: 'create', component: AttributeCreationComponent },
    { path: ':attributeId/edit', component: AttributeEditComponent }
  ]},
  { path: 'sites', component: SiteComponent, canActivate: [AuthGuard],  children:[
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
  { path: 'parties', component: PartyComponent, canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'organizations/company', pathMatch: 'full' },
    { path: 'organizations/company', component: OrganizationCompanyComponent, data:{menuName:'organizations-menu'} },
    { path: 'organizations/listing', component: OrganizationListComponent, data:{menuName: 'organizations-menu'} },
    { path: 'organizations/create', component: OrganizationCreationComponent, data:{menuName: 'organizations-menu'} },
    { path: 'organizations/:partyId/edit', component: OrganizationEditComponent, data:{menuName: 'organizations-menu'} },
    { path: 'users', component: UserListComponent, data:{menuName:'users-menu'} },
    { path: 'users/create', component: UserCreationComponent, data:{menuName:'users-menu'} },
    { path: 'users/:partyId/edit', component: UserEditComponent, data:{menuName:'users-menu'} },
    { path: 'users/me', component: UserMeComponent, data:{menuName:'users-menu'}}
  ]},
  { path: 'access-roles', component: AccessRoleComponent, canActivate: [AuthGuard], children:[
      { path: '', redirectTo: 'listing', pathMatch: 'full' },
      { path: 'listing', component: AccessRoleListComponent, data:{menuName:'access-role-menu'} },
      { path: 'create', component: AccessRoleCreationComponent, data:{menuName: 'access-role-menu'} },
      { path: ':accessRoleId/edit', component: AccessRoleEditComponent, data:{menuName: 'access-role-menu'} },
      { path: 'permissions/listing', component: PermissionListComponent, data:{menuName: 'access-role-menu'} },
      { path: 'permissions/create', component: PermissionCreationComponent, data:{menuName:'access-role-menu'} },
      { path: 'permissions/:permissionId/edit', component: PermissionEditComponent, data:{menuName:'access-role-menu'} },
      { path: 'resources/listing', component: ResourceListComponent, data:{menuName: 'access-role-menu'} },
      { path: 'resources/create', component: ResourceCreationComponent, data:{menuName:'access-role-menu'} },
      { path: 'resources/:resourceId/edit', component: ResourceEditComponent, data:{menuName:'access-role-menu'} },
      { path: 'resource-types/listing', component: ResourceTypeListComponent, data:{menuName: 'access-role-menu'} },
      { path: 'resource-types/create', component: ResourceTypeCreationComponent, data:{menuName:'access-role-menu'} },
      { path: 'resource-types/:resourceTypeId/edit', component: ResourceTypeEditComponent, data:{menuName:'access-role-menu'} }
    ]},
  { path: 'contracts', component: ContractComponent, canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'listing', component: ContractListComponent, data:{menuName:'orders-menu'}},
    { path: 'orders', component: OrderListComponent, data:{menuName:'orders-menu'}},
    { path: 'sales', component: SaleOrderListComponent, data:{menuName:'orders-menu'}},
    { path: 'purchases', component: PurchaseOrderListComponent, data:{menuName:'orders-menu'}},
    { path: 'fulfillments', component: OrderFulfillmentListComponent, data:{menuName:'orders-menu'}},
    { path: 'invoices', component: OrderInvoiceListComponent, data:{menuName:'orders-menu'}}
  ]},
  { path: 'quotes', canActivate: [AuthGuard], component: QuoteComponent, children:[
    { path: '', redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: QuoteListComponent, data:{menuName:'quotes-menu'}},
  ]},
  { path: 'shipments', component:ShipmentComponent, canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: ShipmentListComponent, data:{menuName:'shipments-menu'}},
    { path: 'create', component: ShipmentCreationComponent, data:{menuName:'shipments-menu'} },
    { path: ':shipmentId/edit', component: ShipmentEditComponent, data:{menuName:'shipments-menu'} }
  ]},
  { path: 'create-profile', canActivate: [AuthGuard], component: CreateAccountComponent },
  { path: '**', component: PageNotFoundComponent },
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
