import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthenticationComponent} from "./authentication.component";
import {AuthenticationService} from "./authentication.service";
import {AuthenticationRepository} from "./authentication.repository";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot.password.component";
import {PhoneVerificationComponent} from "./phone-verification/phone.verification.component";
import {EmailVerificationComponent} from "./email-verification/email.verification.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PhoneVerificationComponent,
    EmailVerificationComponent
  ],
  providers: [{
    provide: AuthenticationService,
    useFactory(authenticationRepository:AuthenticationRepository) {
      let authenticationService: AuthenticationService;
      if (!authenticationService) {
        authenticationService = new AuthenticationService(authenticationRepository);
      }
      return authenticationService;
    },
    deps: [AuthenticationRepository]
  }],
  exports: [
    LoginComponent,
    AuthenticationComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PhoneVerificationComponent,
    EmailVerificationComponent
  ]
})
export class AuthenticationModule {}
