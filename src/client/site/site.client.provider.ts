import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {SiteClient} from "./site.client";
import {SiteClientHttp} from "./site.client.http";
import {SiteClientMock} from "./site.client.mock";

export function siteClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator):SiteClient {
  var siteClient: SiteClient;
  if (appConfig.remoteEndPoints) {
    siteClient = new SiteClientHttp(uuidGenerator);
  } else {
    siteClient = new SiteClientMock();
  }
  return siteClient;
}

export let siteClientProvider = {
  provide: SiteClient,
  useFactory: siteClientFactory,
  deps: [AppConfig, UUIDGenerator]
};