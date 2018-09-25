import { BillingDetailsRepository } from "./billing.details.repository";
import { BillingDetailsService } from "./billing.details.service";

export function billingDetailsServiceProviderFactory (billingDetailsRepository: BillingDetailsRepository): BillingDetailsService {
  let billingDetailsService: BillingDetailsService;
  if (!billingDetailsService) {
    billingDetailsService = new BillingDetailsService(billingDetailsRepository);
  }
  return billingDetailsService;
}

export let billingDetailsServiceProvider = {
  provide: BillingDetailsService,
  useFactory: billingDetailsServiceProviderFactory,
  useClass: BillingDetailsService,
  deps: [BillingDetailsRepository]
};
