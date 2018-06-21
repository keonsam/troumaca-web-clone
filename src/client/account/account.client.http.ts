import {AccountClient} from './account.client';
import {UUIDGenerator} from '../../uuid.generator';

export class AccountClientHttp extends AccountClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

}
