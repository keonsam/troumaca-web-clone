import 'rxjs/add/operator/map';
import {RequestClient} from '../../client/request/request.client';
import {RequestRepository} from '../../request/request.repository';

export class RequestRepositoryAdapter extends RequestRepository {
  constructor(private requestClient: RequestClient) {
    super();
  }
}
