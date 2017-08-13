import {AuthenticationClient} from "../../client/authentication/authentication.client";
import {ChangePasswordRepository} from "../../security/change-password/change.password.repository";
import {ChangePasswordRepositoryAdapter} from "./change.password.repository.adapter";

export function changePasswordRepositoryProviderFactory (authenticationClient:AuthenticationClient):ChangePasswordRepository {
  let changePasswordRepositoryAdapter: ChangePasswordRepositoryAdapter;
  if (!changePasswordRepositoryAdapter) {
    changePasswordRepositoryAdapter = new ChangePasswordRepositoryAdapter(authenticationClient);
  }
  return changePasswordRepositoryAdapter;
}

export let changePasswordRepositoryProvider = {
  provide: ChangePasswordRepository,
  useFactory: changePasswordRepositoryProviderFactory,
  deps: [AuthenticationClient]
};