import {ClientEvent} from "./client.event";
import {SessionInterceptor} from "./session.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

export function sessionInterceptorFactory (clientEvent:ClientEvent):SessionInterceptor {
  return new SessionInterceptor(clientEvent);
}

export let sessionInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useFactory: sessionInterceptorFactory,
  multi: true,
  deps: [ClientEvent]
};
