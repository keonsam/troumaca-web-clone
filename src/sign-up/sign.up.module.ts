import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SignUpComponent} from './sign.up.component';
import {SignUpService} from './sign.up.service';
import {SignUpRepository} from './sign.up.repository';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {signUpRouting} from './sign.up.routing';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    signUpRouting,
  ],
  declarations: [
    SignUpComponent
  ],
  providers: [{
    provide: SignUpService,
    useFactory(signUpRepository: SignUpRepository) {
      let signUpService: SignUpService;
      if (!signUpService) {
        signUpService = new SignUpService(signUpRepository);
      }
      return signUpService;
    },
    deps: [SignUpRepository]
  }],
  exports: [
    SignUpComponent
  ]
})
export class SignUpModule {}
