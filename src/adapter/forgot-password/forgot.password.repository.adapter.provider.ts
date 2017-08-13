import {ForgotPasswordRepositoryAdapter} from "./forgot.password.repository.adapter";
import {ForgotPasswordRepository} from "../../login/forgot-password/forgot.password.repository";
import {AuthenticationClient} from "../../client/authentication/authentication.client";

export function forgotPasswordRepositoryProviderFactory (loginClient:AuthenticationClient):ForgotPasswordRepository {
  let forgotPasswordRepositoryAdapter: ForgotPasswordRepositoryAdapter;
  if (!forgotPasswordRepositoryAdapter) {
    forgotPasswordRepositoryAdapter = new ForgotPasswordRepositoryAdapter(loginClient);
  }
  return forgotPasswordRepositoryAdapter;
}

export let forgotPasswordRepositoryProvider = {
  provide: ForgotPasswordRepository,
  useFactory: forgotPasswordRepositoryProviderFactory,
  deps: [AuthenticationClient]
};