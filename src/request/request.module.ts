import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RequestComponent} from './request.component';
import {requestRouting} from './request.routing';
import {RequestService} from './request.service';
import {RequestRepository} from './request.repository';
import {RouterModule} from '@angular/router';
import {LeftMenuModule} from '../left-menu/left.menu.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    requestRouting,
    LeftMenuModule
  ],
  declarations: [
    RequestComponent
  ],
  providers: [{
    provide: RequestService,
    useFactory(requestRepository: RequestRepository) {
      let requestService: RequestService;
      if (!requestService) {
        requestService = new RequestService(requestRepository);
      }
      return requestService;
    },
    deps: [RequestRepository]
  }],
  exports: [
    RequestComponent
  ]
})
export class RequestModule {}
