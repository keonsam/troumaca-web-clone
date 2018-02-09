import {SiteRepositoryAdapter} from "./site.repository.adapter";
import {SiteClient} from "../../client/site/site.client";
import {SiteRepository} from "../../site/site.repository";
import {AssetSiteRepository} from "../../assets/asset.site.repository";

export function siteRepositoryProviderFactory (siteClient:SiteClient):SiteRepository {
  let siteRepositoryAdapter: SiteRepositoryAdapter;
  if (!siteRepositoryAdapter) {
    siteRepositoryAdapter = new SiteRepositoryAdapter(siteClient);
  }
  return siteRepositoryAdapter;
}

export function assetSiteRepositoryProviderFactory (siteClient:SiteClient):AssetSiteRepository {
  let assetSiteRepository: AssetSiteRepository;
  if (!assetSiteRepository) {
    assetSiteRepository = new SiteRepositoryAdapter(siteClient);
  }
  return assetSiteRepository;
}

export let siteRepositoryProvider = {
  provide: SiteRepository,
  useFactory: siteRepositoryProviderFactory,
  deps: [SiteClient]
};

export let assetSiteRepositoryProvider = {
  provide: AssetSiteRepository,
  useFactory: assetSiteRepositoryProviderFactory,
  deps: [SiteClient]
};