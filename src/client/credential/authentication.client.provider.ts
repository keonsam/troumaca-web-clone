import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {AuthenticationClient} from "./authentication.client";
import {AuthenticationClientHttp} from "./authentication.client.http";
import {HttpClient} from "@angular/common/http";

export function authenticationClientFactory (appConfig: AppConfig, httpClient:HttpClient, uuidGenerator: UUIDGenerator):AuthenticationClient {
  return new AuthenticationClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let authenticationClientProvider = {
  provide: AuthenticationClient,
  useFactory: authenticationClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};