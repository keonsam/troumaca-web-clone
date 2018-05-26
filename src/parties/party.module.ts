import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PartyComponent} from "./party.component";
import {PartyService} from "./party.service";
import {PartyRepository} from "./party.repository";
import {RouterModule} from "@angular/router";
import {PersonComponent} from "./persons/person-creation/person.component";
import {MeComponent} from "./persons/person-me/me.component";
import {PersonListComponent} from "./persons/person-list/person.list.component";
import {MenuModule} from "../menu/menu.module";
import {OrganizationListComponent} from "./organizations/organization-list/organization.list.component";
import {OrganizationEditComponent} from "./organizations/organization-edit/organization.edit.component";
import {OrganizationCreationComponent} from "./organizations/organization-creation/organization.creation.component";
import {OrganizationCompanyComponent} from "./organizations/organization-company/organization.company.component";
import {OrganizationTopMenuComponent} from "./organizations/organization-top-menu/organization.top.menu.component";
import {CustomerListComponent} from "./customers/customer-list/customer.list.component";
import {PagingModule} from "../paging/paging.module";
import {CustomerTopMenuComponent} from "./customers/customer-top-menu/customer.top.menu.component";
import {VendorTopMenuComponent} from "./vndors/vendor-top-menu/vendor.top.menu.component";
import {VendorListComponent} from "./vndors/vendor-list/vendor.list.component";
import {EmployeeListComponent} from "./employees/employee-list/employee.list.component";
import {EmployeeTopMenuComponent} from "./employees/employee-top-menu/employee.top.menu.component";
import {UserListComponent} from "./users/user-list/user.list.component";
import {UserTopMenuComponent} from "./users/user-top-menu/user.top.menu.component";
import {UserEditComponent} from "./users/user-edit/user.edit.component";
import {UserCreationComponent} from "./users/user-creation/user.creation.component";
import {UserMeComponent} from "./users/user-me/user.me.component";
import {CreateAccountComponent} from "./create-profile/create.profile.component";
import {PartyEventService} from "./party.event.service";
import { ImageCropperModule } from 'ngx-image-cropper';
import {Ng2CompleterModule} from "ng2-completer";
import { Select2Module } from 'ng2-select2';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    MenuModule,
    Ng2CompleterModule,
    ImageCropperModule,
    Select2Module
  ],
  declarations: [
    PartyComponent,
    PersonComponent,
    PersonListComponent,
    OrganizationListComponent,
    OrganizationEditComponent,
    OrganizationCreationComponent,
    OrganizationCompanyComponent,
    OrganizationTopMenuComponent,
    CustomerListComponent,
    CustomerTopMenuComponent,
    VendorTopMenuComponent,
    VendorListComponent,
    EmployeeTopMenuComponent,
    EmployeeListComponent,
    UserTopMenuComponent,
    UserListComponent,
    UserEditComponent,
    UserCreationComponent,
    UserMeComponent,
    MeComponent,
    CreateAccountComponent
  ],
  providers: [{
    provide: PartyService,
      useFactory(partyRepository:PartyRepository) {
        let partyService: PartyService;
        if (!partyService) {
          partyService = new PartyService(partyRepository);
        }
        return partyService;
      },
      deps: [PartyRepository]
    }, PartyEventService
  ],
  exports: [
    PartyComponent,
    PersonComponent,
    PersonListComponent,
    OrganizationListComponent,
    OrganizationEditComponent,
    OrganizationCreationComponent,
    OrganizationCompanyComponent,
    OrganizationTopMenuComponent,
    CustomerListComponent,
    CustomerTopMenuComponent,
    VendorTopMenuComponent,
    VendorListComponent,
    EmployeeTopMenuComponent,
    EmployeeListComponent,
    UserTopMenuComponent,
    UserListComponent,
    UserEditComponent,
    UserCreationComponent,
    UserMeComponent,
    MeComponent,
    CreateAccountComponent
  ]
})
export class PartyModule {}
