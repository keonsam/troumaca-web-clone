import {SignUpClient} from "../../client/sign-up/sign.up.client";
import {SignUpRepository} from "../../sign-up/sign.up.repository";
import {SignUpRepositoryAdapter} from "./sign.up.repository.adapter";
export function signUpRepositoryProviderFactory(signUpClient:SignUpClient):SignUpRepository {
  let signUpRepositoryAdapter: SignUpRepositoryAdapter;
  if (!signUpRepositoryAdapter) {
    signUpRepositoryAdapter = new SignUpRepositoryAdapter(signUpClient);
  }
  return signUpRepositoryAdapter;
}

export let signUpRepositoryProvider = {
  provide: SignUpRepository,
  useFactory: signUpRepositoryProviderFactory,
  deps: [SignUpClient]
};