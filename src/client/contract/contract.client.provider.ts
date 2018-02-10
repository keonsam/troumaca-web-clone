import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {ContractClient} from "./contract.client";
import {ContractClientHttp} from "./contract.client.http";
import {HttpClient} from "@angular/common/http";


export function contractClientFactory (appConfig: AppConfig, httpClient:HttpClient, uuidGenerator: UUIDGenerator):ContractClient {

  return new ContractClientHttp(uuidGenerator, httpClient, appConfig.apiEndpoint);
}

export let contractClientProvider = {
  provide: ContractClient,
  useFactory: contractClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};
