import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrganizationsComponent} from "./organizations.component";
import {OrganizationService} from "./organization.service";
import {OrganizationRepository} from "./organization.repository";
import {RouterModule} from "@angular/router";
import {InviteModule} from "./invite/invite.module";
import {OrganizationModule} from "./create-new/organization.module";

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
    provide: OrganizationService,
    useFactory(organizationsRepository:OrganizationRepository) {
      let organizationsService: OrganizationService;
      if (!organizationsService) {
        organizationsService = new OrganizationService(organizationsRepository);
      }
      return organizationsService;
    },
    deps: [OrganizationRepository]
  }],
  exports: [
    OrganizationsComponent
  ]
})
export class OrganizationsModule {}