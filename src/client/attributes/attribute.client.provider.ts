import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {AttributeClient} from "./attribute.client";
import {AttributeClientHttp} from "./attribute.client.http";
import {AttributeClientMock} from "./attribute.client.mock";

export function attributeClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):AttributeClient {
  var attributeClient: AttributeClient;
  if (appConfig.remoteEndPoints) {
    attributeClient = new AttributeClientHttp(uuidGenerator);
  } else {
    attributeClient = new AttributeClientMock();
  }
  return attributeClient;
}

export let attributeClientProvider = {
  provide: AttributeClient,
  useFactory: attributeClientFactory,
  deps: [AppConfig, UUIDGenerator]
};