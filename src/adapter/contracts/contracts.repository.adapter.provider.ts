
import {ContractClient} from "../../client/contract/contract.client";
import {ContractRepository} from "../../contracts/contract.repository";
import {ContractRepositoryAdapter} from "./contracts.repository.adapter";

export function contractRepositoryProviderFactory (contractClient:ContractClient):ContractRepository {
  let contractRepositoryAdapter: ContractRepositoryAdapter;
  if (!contractRepositoryAdapter) {
    contractRepositoryAdapter = new ContractRepositoryAdapter(contractClient);
  }
  return contractRepositoryAdapter;
}

export let contractRepositoryProvider = {
  provide: ContractRepository,
  useFactory: contractRepositoryProviderFactory,
  deps: [ContractClient]
};