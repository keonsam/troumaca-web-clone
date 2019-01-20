import {HttpClient} from "@angular/common/http";
import {UUIDGenerator} from "../../uuid.generator";
import { BillingDetailsClient } from "./billing-details.client";
import { BillingDetailsClientHttp } from "./billing-details.client.http";

export function billingDetailsClientFactory (httpClient: HttpClient, uuidGenerator: UUIDGenerator): BillingDetailsClient {

  return new BillingDetailsClientHttp(uuidGenerator, httpClient);
}

export let billingDetailsClientProvider = {
  provide: BillingDetailsClient,
  useFactory: billingDetailsClientFactory,
  deps: [HttpClient, UUIDGenerator]
};
