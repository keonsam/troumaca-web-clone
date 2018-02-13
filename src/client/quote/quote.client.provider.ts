import {AppConfig} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {UUIDGenerator} from "../../uuid.generator";
import {QuoteClient} from "./quote.client";
import {QuoteClientHttp} from "./quote.client.http";

export function quoteClientFactory (appConfig: AppConfig, httpClient:HttpClient, uuidGenerator: UUIDGenerator):QuoteClient {
  return new QuoteClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let quoteClientProvider = {
  provide: QuoteClient,
  useFactory: quoteClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};