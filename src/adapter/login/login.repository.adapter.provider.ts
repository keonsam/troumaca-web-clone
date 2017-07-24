import {LoginClient} from "../../client/login/login.client";
import {LoginRepository} from "../../login/login.repository";
import {LoginRepositoryAdapter} from "./login.repository.adapter";
export function loginRepositoryProviderFactory (loginClient:LoginClient):LoginRepository {
  let loginRepositoryAdapter: LoginRepositoryAdapter;
  if (!loginRepositoryAdapter) {
    loginRepositoryAdapter = new LoginRepositoryAdapter(loginClient);
  }
  return loginRepositoryAdapter;
}

export let loginRepositoryProvider = {
  provide: LoginRepository,
  useFactory: loginRepositoryProviderFactory,
  deps: [LoginClient]
};