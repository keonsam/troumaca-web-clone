import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SessionService} from './session.service';
import {SessionRepository} from './session.repository';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  ],
  providers: [{
    provide: SessionService,
    useFactory(sessionRepository: SessionRepository) {
      let sessionService: SessionService;
      if (!sessionService) {
        sessionService = new SessionService(sessionRepository);
      }
      return sessionService;
    },
    deps: [SessionRepository]
  }],
  exports: [
  ]
})
export class SessionModule {}
