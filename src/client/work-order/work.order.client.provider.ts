import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {WorkOrderClient} from "./work.order.client";
import {WorkOrderClientHttp} from "./work.order.client.http";
import {WorkOrderClientMock} from "./work.order.client.mock";

export function workOrderClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):WorkOrderClient {
  var workOrderClient: WorkOrderClient;
  if (appConfig.remoteEndPoints) {
    workOrderClient = new WorkOrderClientHttp(uuidGenerator);
  } else {
    workOrderClient = new WorkOrderClientMock();
  }
  return workOrderClient;
}

export let workOrderClientProvider = {
  provide: WorkOrderClient,
  useFactory: workOrderClientFactory,
  deps: [AppConfig, UUIDGenerator]
};