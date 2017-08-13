import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "./login.component";
import {LoginService} from "./login.service";
import {LoginRepository} from "./login.repository";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {loginRouting} from "./login.routing";
import {RouterModule} from "@angular/router";
import {ForgotPasswordModule} from "./forgot-password/forgot.password.module";
import {SignInModule} from "./sign-in/sign.in.module";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    loginRouting,
    ForgotPasswordModule,
    SignInModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {}