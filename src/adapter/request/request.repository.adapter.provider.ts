import {RequestRepositoryAdapter} from "./request.repository.adapter";
import {RequestClient} from "../../client/request/request.client";
import {RequestRepository} from "../../request/request.repository";

export function requestRepositoryProviderFactory (requestClient:RequestClient):RequestRepository {
  let requestRepositoryAdapter: RequestRepositoryAdapter;
  if (!requestRepositoryAdapter) {
    requestRepositoryAdapter = new RequestRepositoryAdapter(requestClient);
  }
  return requestRepositoryAdapter;
}

export let requestRepositoryProvider = {
  provide: RequestRepository,
  useFactory: requestRepositoryProviderFactory,
  deps: [RequestClient]
};