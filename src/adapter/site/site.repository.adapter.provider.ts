import {SiteRepositoryAdapter} from './site.repository.adapter';
import {SiteClient} from '../../client/site/site.client';
import {SiteRepository} from '../../site/site.repository';

export function siteRepositoryProviderFactory (siteClient: SiteClient): SiteRepository {
  let siteRepositoryAdapter: SiteRepositoryAdapter;
  if (!siteRepositoryAdapter) {
    siteRepositoryAdapter = new SiteRepositoryAdapter(siteClient);
  }
  return siteRepositoryAdapter;
}

export let siteRepositoryProvider = {
  provide: SiteRepository,
  useFactory: siteRepositoryProviderFactory,
  deps: [SiteClient]
};
