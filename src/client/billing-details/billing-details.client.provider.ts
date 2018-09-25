import {AppConfig} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {UUIDGenerator} from "../../uuid.generator";
import { BillingDetailsClient } from "./billing-details.client";
import { BillingDetailsClientHttp } from "./billing-details.client.http";

export function billingDetailsClientFactory (appConfig: AppConfig, httpClient: HttpClient, uuidGenerator: UUIDGenerator): BillingDetailsClient {

  return new BillingDetailsClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let billingDetailsClientProvider = {
  provide: BillingDetailsClient,
  useFactory: billingDetailsClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
