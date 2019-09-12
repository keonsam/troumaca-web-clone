// import {SessionRepository} from './session.repository';
// import {BehaviorSubject, Observable} from 'rxjs';
// import {Injectable} from '@angular/core';
//
//
// export function sessionServiceProviderFactory (sessionRepository: SessionRepository): SessionService {
//   return new SessionService(sessionRepository);
// }
//
// @Injectable({
//   providedIn: 'root',
//   useFactory: sessionServiceProviderFactory,
//   useClass: SessionService,
//   deps: [SessionRepository]
// })
// export class SessionService {
//
//   loginEvent = new BehaviorSubject<boolean>(false);
//   logoutEvent = new BehaviorSubject<boolean>(false);
//
//   constructor(private sessionRepository: SessionRepository) {
//   }
//
//   logout(): Observable<boolean> {
//     return this.sessionRepository.logout();
//   }
//
//   activeSessionExists(): Observable<boolean> {
//     return this.sessionRepository.activeSessionExists();
//   }
//
// }
