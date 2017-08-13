import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {AssetTypeClient} from "./asset.type.client";
import {AssetTypeClientHttp} from "./asset.type.client.http";
import {AssetTypeClientMock} from "./asset.type.client.mock";

export function assetTypeClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):AssetTypeClient {
  var assetTypeClient: AssetTypeClient;
  if (appConfig.remoteEndPoints) {
    assetTypeClient = new AssetTypeClientHttp(uuidGenerator);
  } else {
    assetTypeClient = new AssetTypeClientMock();
  }
  return assetTypeClient;
}

export let assetTypeClientProvider = {
  provide: AssetTypeClient,
  useFactory: assetTypeClientFactory,
  deps: [AppConfig, UUIDGenerator]
};