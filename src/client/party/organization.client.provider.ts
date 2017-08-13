import {OrganizationClient} from "./organization.client";
import {UUIDGenerator} from "../../uuid.generator";
import {AppConfig} from "../../app.config";
import {OrganizationClientHttp} from "./organization.client.http";
import {OrganizationClientMock} from "./organization.client.mock";

export function organizationClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):OrganizationClient {
  var organizationClient: OrganizationClient;
  if (appConfig.remoteEndPoints) {
    organizationClient = new OrganizationClientHttp(uuidGenerator);
  } else {
    organizationClient = new OrganizationClientMock(uuidGenerator);
  }
  return organizationClient;
}

export let organizationClientProvider = {
  provide: OrganizationClient,
  useFactory: organizationClientFactory,
  deps: [AppConfig, UUIDGenerator]
};