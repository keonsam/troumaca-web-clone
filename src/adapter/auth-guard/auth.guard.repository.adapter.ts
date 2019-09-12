// import { AuthGuardService} from '../../auth-guard/auth.guard.service';
// import { Observable } from 'rxjs';
// import {ValidSession} from '../../session/valid.session';
// import {Apollo} from 'apollo-angular';
// import gql from 'graphql-tag';
// import {map} from 'rxjs/operators';
//
// export class AuthGuardRepositoryAdapter extends AuthGuardService {
//
//   constructor(private apollo: Apollo) {
//     super();
//   }
//
//   isValidSession(): Observable<ValidSession> {
//     return this.apollo.query({
//       query: gql`
//         query isValidSession {
//           isValidSession {
//             valid
//           }
//         }
//       `,
//     }).pipe(map((res: any) => res.data.isValidSession));
//   }
// }
