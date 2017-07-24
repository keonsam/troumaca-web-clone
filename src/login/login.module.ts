import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "./login.component";
import {LoginService} from "./login.service";
import {LoginRepository} from "./login.repository";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {loginRouting} from "./login.routing";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    loginRouting,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [{
    provide: LoginService,
    useFactory(loginRepository:LoginRepository) {
      let loginService: LoginService;
      if (!loginService) {
        loginService = new LoginService(loginRepository);
      }
      return loginService;
    },
    deps: [LoginRepository]
  }],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {}