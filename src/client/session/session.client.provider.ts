import {AppConfig} from "../../app.config";
import {UUIDGenerator} from "../../uuid.generator";
import {SessionClient} from "./session.client";
import {SessionClientHttp} from "./session.client.http";
import {HttpClient} from "@angular/common/http";
import {EventService} from "../../event/event.service";

export function sessionClientFactory (appConfig: AppConfig, http:HttpClient, uuidGenerator: UUIDGenerator, eventService: EventService):SessionClient {
  return new SessionClientHttp(uuidGenerator, http, appConfig.apiEndpoint, eventService);
}

export let sessionClientProvider = {
  provide: SessionClient,
  useFactory: sessionClientFactory,
  deps: [AppConfig, HttpClient,UUIDGenerator, EventService]
};
