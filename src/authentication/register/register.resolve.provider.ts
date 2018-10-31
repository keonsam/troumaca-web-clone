import { RegisterResolve } from "./register.resolve";
import { AuthenticationService } from "../authentication.service";

export function registerResolveProviderFactory (authenticationService: AuthenticationService): RegisterResolve {
  let registerResolve: RegisterResolve;
  if (!registerResolve) {
    registerResolve = new RegisterResolve(authenticationService);
  }
  return registerResolve;
}

export let registerResolveProvider = {
  provide: RegisterResolve,
  useFactory: registerResolveProviderFactory,
  deps: [AuthenticationService]
};
