// import { UserRepository} from '../../../parties/users/user.repository';
// import {UserRepositoryAdapter} from './user.repository.adapter';
// import { UserClient } from '../../../client/party/user/user.client';
//
//
// export function userRepositoryProviderFactory (userClient: UserClient): UserRepository {
//   let userRepositoryAdapter: UserRepositoryAdapter;
//   if (!userRepositoryAdapter) {
//     userRepositoryAdapter = new UserRepositoryAdapter(userClient);
//   }
//   return userRepositoryAdapter;
// }
//
// export let userRepositoryProvider = {
//   provide: UserRepository,
//   useFactory: userRepositoryProviderFactory,
//   deps: [UserClient]
// };
