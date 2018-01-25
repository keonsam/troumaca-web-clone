import "rxjs/add/operator/map";
import {SiteClient} from "../../client/sites/site.client";
import {SiteRepository} from "../../site/site.repository";
import {AssetSiteRepository} from "../../assets/asset.site.repository";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import { map, reduce, somethingElse } from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AssetUnionOfPhysicalSites} from "../../assets/asset.union.of.physical.sites";
import {UnionOfPhysicalSite} from "../../assets/asset.union.of.physical.site";
import {Emails} from "../../site/emails";

export class SiteRepositoryAdapter extends SiteRepository implements AssetSiteRepository {

  constructor(private siteClient: SiteClient) {
    super();
  }


  public getEmails(pageNumber:number):Observable<Emails> {
    return this.siteClient
      .getEmails(pageNumber)
      .map(values => {
        let emails:Emails = new Emails();
        emails.emails = map(values.emails, value => {
          return mapObjectProps(value, new Emails());
        });
        return emails;
      });
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<AssetUnionOfPhysicalSites> {
    return this.siteClient
      .findUnionOfPhysicalSiteStates(searchStr, pageSize)
      .map(values => {
        let unionOfPhysicalSites:AssetUnionOfPhysicalSites = new AssetUnionOfPhysicalSites();
        unionOfPhysicalSites.unionOfPhysicalSites = map(values.unionOfPhysicalSites, value => {
          return mapObjectProps(value, new UnionOfPhysicalSite());
        });
        return unionOfPhysicalSites;
      });
  }

}