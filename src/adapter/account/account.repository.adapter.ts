import {AccountRepository} from "../../account/account.repository";
import {AccountClient} from "../../client/accounts/account.client";

export class AccountRepositoryAdapter extends AccountRepository {

  constructor(private accountClient: AccountClient) {
    super();
  }

}