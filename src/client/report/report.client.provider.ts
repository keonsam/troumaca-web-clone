import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {ReportClient} from './report.client';
import {ReportClientHttp} from './report.client.http';
import {ReportClientMock} from './report.client.mock';

export function reportClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator): ReportClient {
  let reportClient: ReportClient;
  if (appConfig.remoteEndPoints) {
    reportClient = new ReportClientHttp(uuidGenerator);
  } else {
    reportClient = new ReportClientMock();
  }
  return reportClient;
}

export let reportClientProvider = {
  provide: ReportClient,
  useFactory: reportClientFactory,
  deps: [AppConfig, UUIDGenerator]
};
