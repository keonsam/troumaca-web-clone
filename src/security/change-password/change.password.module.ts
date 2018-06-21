import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChangePasswordComponent} from './change.password.component';
import {ChangePasswordService} from './change.password.service';
import {ChangePasswordRepository} from './change.password.repository';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChangePasswordComponent
  ],
  providers: [{
    provide: ChangePasswordService,
    useFactory(changePasswordRepository: ChangePasswordRepository) {
      let changePasswordService: ChangePasswordService;
      if (!changePasswordService) {
        changePasswordService = new ChangePasswordService(changePasswordRepository);
      }
      return changePasswordService;
    },
    deps: [ChangePasswordRepository]
  }],
  exports: [
    ChangePasswordComponent
  ]
})
export class ChangePasswordModule {}
