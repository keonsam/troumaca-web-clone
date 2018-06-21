import {AccountClient} from '../../client/account/account.client';
import {AccountRepository} from '../../account/account.repository';
import {AccountRepositoryAdapter} from './account.repository.adapter';
export function accountRepositoryProviderFactory (accountClient: AccountClient): AccountRepository {
  let accountRepositoryAdapter: AccountRepositoryAdapter;
  if (!accountRepositoryAdapter) {
    accountRepositoryAdapter = new AccountRepositoryAdapter(accountClient);
  }
  return accountRepositoryAdapter;
}

export let accountRepositoryProvider = {
  provide: AccountRepository,
  useFactory: accountRepositoryProviderFactory,
  deps: [AccountClient]
};
