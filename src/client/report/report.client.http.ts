import {ReportClient} from './report.client';
import {UUIDGenerator} from '../../uuid.generator';

export class ReportClientHttp extends ReportClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}
