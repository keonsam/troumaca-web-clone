import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {SiteClient} from "./site.client";
import {SiteClientHttp} from "./site.client.http";
import {HttpClient} from "@angular/common/http";

export function siteClientFactory (appConfig: AppConfig, httpClient:HttpClient, uuidGenerator: UUIDGenerator):SiteClient {
  return new SiteClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let siteClientProvider = {
  provide: SiteClient,
  useFactory: siteClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};