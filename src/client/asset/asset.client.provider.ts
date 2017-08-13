import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {AssetClient} from "./asset.client";
import {AssetClientHttp} from "./asset.client.http";
import {AssetClientMock} from "./asset.client.mock";

export function assetClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):AssetClient {
  var assetClient: AssetClient;
  if (appConfig.remoteEndPoints) {
    assetClient = new AssetClientHttp(uuidGenerator);
  } else {
    assetClient = new AssetClientMock();
  }
  return assetClient;
}

export let assetClientProvider = {
  provide: AssetClient,
  useFactory: assetClientFactory,
  deps: [AppConfig, UUIDGenerator]
};