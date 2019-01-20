// import {SessionService} from './session.service';
// import {SessionRepository} from './session.repository';
//
// export function sessionServiceProviderFactory (sessionRepository: SessionRepository): SessionService {
//   let sessionService: SessionService;
//   if (!sessionService) {
//     sessionService = new SessionService(sessionRepository);
//   }
//   return sessionService;
// }
//
// export let sessionServiceProvider = {
//   provide: SessionService,
//   useFactory: sessionServiceProviderFactory,
//   useClass: SessionService,
//   deps: [SessionRepository]
// };
