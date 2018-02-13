import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {AttributeClient} from "./attribute.client";
import {AttributeClientHttp} from "./attribute.client.http";
import {HttpClient} from "@angular/common/http";

export function attributeClientFactory (appConfig: AppConfig, httpClient:HttpClient, uuidGenerator: UUIDGenerator):AttributeClient {

  return new AttributeClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let attributeClientProvider = {
  provide: AttributeClient,
  useFactory: attributeClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
