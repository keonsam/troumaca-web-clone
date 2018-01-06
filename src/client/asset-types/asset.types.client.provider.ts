import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {AssetTypesClient} from "./asset.types.client";
import {AssetTypesClientHttp} from "./asset.types.client.http";
// import {AssetTypesClientMock} from "./asset.types.client.mock";
import {HttpClient} from "@angular/common/http";

export function assetTypesClientFactory (appConfig: AppConfig, httpClient:HttpClient, uuidGenerator: UUIDGenerator):AssetTypesClient {
  // var assetTypesClient: AssetTypesClient;
  // if (appConfig.remoteEndPoints) {
  //   assetTypesClient = new AssetTypesClientHttp(httpClient, uuidGenerator, appConfig.apiEndpoint);
  // } else {
  //   assetTypesClient = new AssetTypesClientMock(httpClient, uuidGenerator);
  // }
  return new AssetTypesClientHttp(httpClient, uuidGenerator, appConfig.apiEndpoint);
}

export let assetTypesClientProvider = {
  provide: AssetTypesClient,
  useFactory: assetTypesClientFactory,
  deps: [AppConfig, HttpClient, UUIDGenerator]
};