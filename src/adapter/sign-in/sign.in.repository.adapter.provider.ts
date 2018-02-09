import {SignInRepositoryAdapter} from "./sign.in.repository.adapter";
import {SignInRepository} from "../../login/sign-in/sign.in.repository";
import {AuthenticationClient} from "../../client/credential/authentication.client";

export function signInRepositoryProviderFactory (loginClient:AuthenticationClient):SignInRepository {
  let signInRepositoryAdapter: SignInRepositoryAdapter;
  if (!signInRepositoryAdapter) {
    signInRepositoryAdapter = new SignInRepositoryAdapter(loginClient);
  }
  return signInRepositoryAdapter;
}

export let signInRepositoryProvider = {
  provide: SignInRepository,
  useFactory: signInRepositoryProviderFactory,
  deps: [AuthenticationClient]
};