// import {SecurityRepository} from '../../security/security.repository';
// import {SecurityClient} from '../../client/security/security.client';
// import {SecurityRepositoryAdapter} from './security.repository.adapter';
//
// export function securityRepositoryProviderFactory (securityClient: SecurityClient): SecurityRepository {
//   let securityRepositoryAdapter: SecurityRepositoryAdapter;
//   if (!securityRepositoryAdapter) {
//     securityRepositoryAdapter = new SecurityRepositoryAdapter(securityClient);
//   }
//   return securityRepositoryAdapter;
// }
//
// export let securityRepositoryProvider = {
//   provide: SecurityRepository,
//   useFactory: securityRepositoryProviderFactory,
//   deps: [SecurityClient]
// };
