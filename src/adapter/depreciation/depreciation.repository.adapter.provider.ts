import {DepreciationClient} from "../../client/depreciation/depreciation.client";
import {DepreciationRepository} from "../../depreciation/depreciation.repository";
import {DepreciationRepositoryAdapter} from "./depreciation.repository.adapter";

export function depreciationRepositoryProviderFactory (depreciationClient: DepreciationClient): DepreciationRepository {
  let depreciationRepositoryAdapter: DepreciationRepositoryAdapter;
  if (!depreciationRepositoryAdapter) {
    depreciationRepositoryAdapter = new DepreciationRepositoryAdapter(depreciationClient);
  }
  return depreciationRepositoryAdapter;
}

export let depreciationRepositoryProvider = {
  provide: DepreciationRepository,
  useFactory: depreciationRepositoryProviderFactory,
  deps: [DepreciationClient]
};
