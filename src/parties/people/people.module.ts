import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

// providers
import { MaterialModule } from '../../app/material.module';
import {DeleteModalModule} from '../../delete-modal/delete.modal.module';
import {PartyModule} from '../party.module';
import {PagingModule} from '../../paging/paging.module';
import {peopleServiceProvider} from './people.service.provider';
import {PeopleComponent} from './people.component';
import {PeopleFormComponent} from './people-form/people.form.component';
import {PeopleListComponent} from './people-list/people.list.component';
import {peopleResolveProvider} from './people-form/people.resolve.provider';
import {peoplesResolveProvider} from './people-list/peoples.resolve.provider';
import {PeopleRoutingModule} from './people.routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DeleteModalModule,
    PagingModule,
    PeopleRoutingModule,
    PartyModule
  ],
  declarations: [
    PeopleComponent,
    PeopleFormComponent,
    PeopleListComponent
  ],
  providers: [
    peopleServiceProvider,
    peopleResolveProvider,
    peoplesResolveProvider
  ],
})
export class PeopleModule { }
