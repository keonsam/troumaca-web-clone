import {PersonClient} from "./person.client";
import {UUIDGenerator} from "../../uuid.generator";
import {AppConfig} from "../../app.config";
import {PersonClientHttp} from "./person.client.http";
import {HttpClient} from "@angular/common/http";

export function personClientFactory (appConfig: AppConfig, httpClient:HttpClient, uuidGenerator: UUIDGenerator):PersonClient {
  return new PersonClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let personClientProvider = {
  provide: PersonClient,
  useFactory: personClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};