// import {NgModule} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {ChangePasswordComponent} from './change.password.component';
// import {ChangePasswordService} from './change.password.service';
// import {ChangePasswordRepository} from './change.password.repository';
// import {RouterModule} from '@angular/router';
// import {changePasswordRepositoryProvider} from '../../adapter/change-password/change.password.repository.adapter.provider';
//
// @NgModule({
//   imports: [
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     ReactiveFormsModule
//   ],
//   declarations: [
//     ChangePasswordComponent
//   ],
//   providers: [{
//     provide: ChangePasswordService,
//     useFactory(changePasswordRepository: ChangePasswordRepository) {
//       let changePasswordService: ChangePasswordService;
//       if (!changePasswordService) {
//         changePasswordService = new ChangePasswordService(changePasswordRepository);
//       }
//       return changePasswordService;
//     },
//     deps: [ChangePasswordRepository]
//   },
//     changePasswordRepositoryProvider,
//
//   ],
//   exports: [
//     ChangePasswordComponent
//   ]
// })
// export class ChangePasswordModule {}
