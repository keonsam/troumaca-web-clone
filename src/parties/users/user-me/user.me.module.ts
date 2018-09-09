import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PhotoModule} from '../../../photo/photo.module';
import { userServiceProvider } from '../user.service.provider';
import { authenticationServiceProvider } from '../../../authentication/authenticate.service.provider';
import { UserMeComponent } from './user.me.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PhotoModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserMeComponent
  ],
  providers: [userServiceProvider, authenticationServiceProvider],
  exports: [
    UserMeComponent
  ],
})

export class UserMeModule { }
