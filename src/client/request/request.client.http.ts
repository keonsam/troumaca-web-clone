import {RequestClient} from './request.client';
import {UUIDGenerator} from '../../uuid.generator';

export class RequestClientHttp extends RequestClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}
