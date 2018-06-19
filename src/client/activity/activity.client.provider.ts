import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {ActivityClient} from './activity.client';
import {ActivityClientHttp} from './activity.client.http';
import {ActivityClientMock} from './activity.client.mock';

export function activityClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator): ActivityClient {
  let activityClient: ActivityClient;
  if (appConfig.remoteEndPoints) {
    activityClient = new ActivityClientHttp(uuidGenerator);
  } else {
    activityClient = new ActivityClientMock();
  }
  return activityClient;
}

export let activityClientProvider = {
  provide: ActivityClient,
  useFactory: activityClientFactory,
  deps: [AppConfig, UUIDGenerator]
};
