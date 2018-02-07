import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {SessionClient} from "./session.client";
import {SessionClientHttp} from "./session.client.http";
import {HttpClient} from "@angular/common/http";

export function sessionClientFactory (appConfig: AppConfig, http:HttpClient, uuidGenerator: UUIDGenerator):SessionClient {
  return new SessionClientHttp(uuidGenerator, http, appConfig.apiEndpoint);
}

export let sessionClientProvider = {
  provide: SessionClient,
  useFactory: sessionClientFactory,
  deps: [AppConfig, UUIDGenerator, HttpClient]
};