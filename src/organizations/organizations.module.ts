import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrganizationsComponent} from "./organizations.component";
import {organizationsRouting} from "./organizations.routing";
import {OrganizationsService} from "./organizations.service";
import {OrganizationsRepository} from "./organizations.repository";
import {RouterModule} from "@angular/router";
import {OrganizationComponent} from "./create-new/organization.component";
import {InviteComponent} from "./invite/invite.component";
import {InviteModule} from "./invite/invite.module";
import {OrganizationModule} from "./create-new/organization.module";

// organizationsRouting,
// , OrganizationCompone
// nt, InviteComponent
// , OrganizationComponent, InviteComponent
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InviteModule,
    OrganizationModule
  ],
  declarations: [
    OrganizationsComponent
  ],
  providers: [{
    provide: OrganizationsService,
    useFactory(organizationsRepository:OrganizationsRepository) {
      let organizationsService: OrganizationsService;
      if (!organizationsService) {
        organizationsService = new OrganizationsService(organizationsRepository);
      }
      return organizationsService;
    },
    deps: [OrganizationsRepository]
  }],
  exports: [
    OrganizationsComponent
  ]
})
export class OrganizationsModule {}