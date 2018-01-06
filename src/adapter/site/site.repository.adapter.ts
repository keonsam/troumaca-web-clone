import "rxjs/add/operator/map";
import {SiteClient} from "../../client/sites/site.client";
import {SiteRepository} from "../../site/site.repository";
import {AssetSiteRepository} from "../../assets/asset.site.repository";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import { map, reduce, somethingElse } from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AssetUnionOfPhysicalSites} from "../../assets/asset.union.of.physical.sites";
import {AssetUnionOfPhysicalSite} from "../../assets/asset.union.of.physical.site";

export class SiteRepositoryAdapter extends SiteRepository implements AssetSiteRepository {

  constructor(private siteClient: SiteClient) {
    super();
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<AssetUnionOfPhysicalSites> {
    return this.siteClient
      .findUnionOfPhysicalSiteStates(searchStr, pageSize)
      .map(values => {
        let unionOfPhysicalSites:AssetUnionOfPhysicalSites = new AssetUnionOfPhysicalSites();
        unionOfPhysicalSites.unionOfPhysicalSites = map(values.unionOfPhysicalSites, value => {
          return mapObjectProps(value, new AssetUnionOfPhysicalSite());
        });
        return unionOfPhysicalSites;
      });
  }

}