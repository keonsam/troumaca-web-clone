import { BillingDetailsClient } from "../../client/billing-details/billing-details.client";
import { BillingDetailsRepository } from "../../billing-details/billing.details.repository";
import { BillingDetailsRepositoryAdapter } from "./billing-details.repository.adapter";

export function billingDetailsRepositoryFactory (billingDetailsClient: BillingDetailsClient): BillingDetailsRepository {
  let billingDetailsRepositoryAdapter: BillingDetailsRepositoryAdapter;

  if (!billingDetailsRepositoryAdapter) {
    billingDetailsRepositoryAdapter = new BillingDetailsRepositoryAdapter(billingDetailsClient);
  }

  return billingDetailsRepositoryAdapter;
}

export let billingDetailsRepositoryProvider = {
  provide: BillingDetailsRepository,
  useFactory: billingDetailsRepositoryFactory,
  deps: [BillingDetailsClient]
};
