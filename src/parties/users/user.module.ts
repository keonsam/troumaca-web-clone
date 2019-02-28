import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

// providers
import { MaterialModule } from '../../app/material.module';
import {UserFormComponent} from './user-form/user.form.component';
import {UserListComponent} from './user-list/user.list.component';
import {UserMeComponent} from './user-me/user.me.component';
import {userServiceProvider} from './user.service.provider';
import {userMeResolveProvider} from './user-me/user.me.resolve.provider';
import {usersResolveProvider} from './user-list/users.resolve.provider';
import {userResolveProvider} from './user.resolve.provider';
import {userRepositoryProvider} from '../../adapter/party/user/user.repository.adapter.provider';
import {userClientProvider} from '../../client/party/user/user.client.provider';
import {DeleteModalModule} from '../../delete-modal/delete.modal.module';
import {UserRoutingModule} from './user.routing.module';
import {PartyModule} from '../party.module';
import {UserComponent} from './user.component';
import {PagingModule} from '../../paging/paging.module';
import {PhotoModule} from '../photo/photo.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DeleteModalModule,
    PagingModule,
    PhotoModule,
    UserRoutingModule,
    PartyModule
  ],
  declarations: [
    UserComponent,
    UserFormComponent,
    UserListComponent,
    UserMeComponent
  ],
  providers: [
    userServiceProvider,
    userMeResolveProvider,
    usersResolveProvider,
    userResolveProvider,
    userRepositoryProvider,
    userClientProvider
  ],
})
export class UserModule {}
