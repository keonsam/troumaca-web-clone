import {LoginRepository} from "../../login/login.repository";
import {LoginRepositoryAdapter} from "./login.repository.adapter";
import {AuthenticationClient} from "../../client/authentication/authentication.client";

export function authenticationRepositoryProviderFactory (authenticationClient:AuthenticationClient):LoginRepository {
  let authenticationRepositoryAdapter: LoginRepositoryAdapter;
  if (!authenticationRepositoryAdapter) {
    authenticationRepositoryAdapter = new LoginRepositoryAdapter(authenticationClient);
  }
  return authenticationRepositoryAdapter;
}

export let authenticationRepositoryProvider = {
  provide: LoginRepository,
  useFactory: authenticationRepositoryProviderFactory,
  deps: [AuthenticationClient]
};