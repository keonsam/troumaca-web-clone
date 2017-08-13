import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ForgotPasswordComponent} from "./forgot.password.component";
import {ForgotPasswordService} from "./forgot.password.service";
import {ForgotPasswordRepository} from "./forgot.password.repository";
// import {forgotPasswordRouting} from "./forgot.password.routing";
import {RouterModule} from "@angular/router";

// forgotPasswordRouting,

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    ForgotPasswordComponent
  ],
  providers: [{
    provide: ForgotPasswordService,
    useFactory(forgotPasswordRepository:ForgotPasswordRepository) {
      let forgotPasswordService: ForgotPasswordService;
      if (!forgotPasswordService) {
        forgotPasswordService = new ForgotPasswordService(forgotPasswordRepository);
      }
      return forgotPasswordService;
    },
    deps: [ForgotPasswordRepository]
  }],
  exports: [
    ForgotPasswordComponent
  ]
})
export class ForgotPasswordModule {}