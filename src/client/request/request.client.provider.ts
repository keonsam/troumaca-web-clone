import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {RequestClient} from "./request.client";
import {RequestClientHttp} from "./request.client.http";
import {RequestClientMock} from "./request.client.mock";

export function requestClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):RequestClient {
  var requestClient: RequestClient;
  if (appConfig.remoteEndPoints) {
    requestClient = new RequestClientHttp(uuidGenerator);
  } else {
    requestClient = new RequestClientMock();
  }
  return requestClient;
}

export let requestClientProvider = {
  provide: RequestClient,
  useFactory: requestClientFactory,
  deps: [AppConfig, UUIDGenerator]
};