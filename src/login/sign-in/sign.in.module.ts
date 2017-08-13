import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SignInComponent} from "./sign.in.component";
import {SignInService} from "./sign.in.service";
import {SignInRepository} from "./sign.in.repository";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {loginRouting} from "./sign.in.routing";
import {RouterModule} from "@angular/router";

// ,
// loginRouting

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignInComponent
  ],
  providers: [{
    provide: SignInService,
    useFactory(signInRepository:SignInRepository) {
      let signInService: SignInService;
      if (!signInService) {
        signInService = new SignInService(signInRepository);
      }
      return signInService;
    },
    deps: [SignInRepository]
  }],
  exports: [
    SignInComponent
  ]
})
export class SignInModule {}