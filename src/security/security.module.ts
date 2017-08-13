import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SecurityComponent} from "./security.component";
import {SecurityService} from "./security.service";
import {SecurityRepository} from "./security.repository";
import {RouterModule} from "@angular/router";
import {ChangePasswordModule} from "./change-password/change.password.module";
import {SessionModule} from "./session/session.module";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChangePasswordModule,
    SessionModule
  ],
  declarations: [
    SecurityComponent
  ],
  providers: [{
    provide: SecurityService,
    useFactory(securityRepository:SecurityRepository) {
      let securityService: SecurityService;
      if (!securityService) {
        securityService = new SecurityService(securityRepository);
      }
      return securityService;
    },
    deps: [SecurityRepository]
  }],
  exports: [
    SecurityComponent
  ]
})
export class SecurityModule {}