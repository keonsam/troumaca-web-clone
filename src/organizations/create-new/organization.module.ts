import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrganizationComponent} from "./organization.component";
// import {organizationRouting} from "./organization.routing";
import {OrganizationService} from "./organization.service";
import {OrganizationRepository} from "./organization.repository";
import {RouterModule} from "@angular/router";

// ,
// organizationRouting,

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrganizationComponent
  ],
  providers: [{
    provide: OrganizationService,
    useFactory(organizationRepository:OrganizationRepository) {
      let organizationService: OrganizationService;
      if (!organizationService) {
        organizationService = new OrganizationService(organizationRepository);
      }
      return organizationService;
    },
    deps: [OrganizationRepository]
  }],
  exports: [
    OrganizationComponent
  ]
})
export class OrganizationModule {}