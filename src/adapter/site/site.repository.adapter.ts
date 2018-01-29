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
import {StreetAddresses} from "../../site/street.addresses";
import {PostOfficeBoxState} from "../../client/sites/post.office.box.state";
import {PostOfficeBoxes} from "../../site/post.office.boxes";
import {Phones} from "../../site/phones";
import {WebSites} from "../../site/web.sites";
import {Phone} from "../../site/phone";
import {PhoneState} from "../../client/sites/phone.state";
import {WebSite} from "../../site/web.site";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";

export class SiteRepositoryAdapter extends SiteRepository implements AssetSiteRepository {

  constructor(private siteClient: SiteClient) {
    super();
  }

  public getStreetAddresses(pageNumber: number): Observable<StreetAddresses> {
    return this.siteClient
    .getStreetAddressStates(pageNumber)
    .map(values => {
      let streetAddresses:StreetAddresses = new StreetAddresses();
      streetAddresses.streetAddresses = map(values.streetAddresses, value => {
        return mapObjectProps(value, new StreetAddresses());
      });
      return streetAddresses;
    });
  }

  public getPostOfficeBoxes(pageNumber:number):Observable<PostOfficeBoxes> {
    return this.siteClient
    .getPostOfficeBoxStates(pageNumber)
    .map(values => {
      let postOfficeBoxes:PostOfficeBoxes = new PostOfficeBoxes();
      postOfficeBoxes.postOfficeBoxes = map(values.postOfficeBoxes, value => {
        return mapObjectProps(value, new PostOfficeBoxes());
      });
      return postOfficeBoxes;
    });
  }

  public getEmails(pageNumber:number):Observable<Emails> {
    return this.siteClient
    .getEmailStates(pageNumber)
    .map(values => {
      let emails:Emails = new Emails();
      emails.emails = map(values.emails, value => {
        return mapObjectProps(value, new Emails());
      });
      return emails;
    });
  }

  public getPhone(siteId:string):Observable<Phone> {
    return this.siteClient
    .getPhoneState(siteId)
    .map(value => {
       return mapObjectProps(value, new Phone());
    });
  }

  public getPhones(pageNumber:number, pageSize:number, sortOrder:string):Observable<Phones> {
    return this.siteClient
    .getPhoneStates(pageNumber, pageSize, sortOrder)
    .map(values => {
      let phones:Phones = new Phones();
      phones.phones = map(values.phones, value => {
        let phone = mapObjectProps(value, new Phone());
        return phone;
      });

      phones.page = mapObjectProps(values.page, new Page());
      phones.sort = mapObjectProps(values.sort, new Sort());
      return phones;
    });
  }

  public getWebSites(pageNumber:number):Observable<WebSites> {
    return this.siteClient
    .getWebSiteStates(pageNumber)
    .map(values => {
      let webSites:WebSites = new WebSites();
      webSites.webSites = map(values.webSites, value => {
        return mapObjectProps(value, new WebSite());
      });
      return webSites;
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

  public addPhone(phone:Phone):Observable<Phone> {
    return this.siteClient
    .addPhone(mapObjectProps(phone, new PhoneState()))
    .map(phoneState => {
      return mapObjectProps(phoneState, new Phone());
    })
  }

  public updatePhone(siteId:string, phone: Phone): Observable<number> {
    return this.siteClient.updatePhone(string, mapObjectProps(phone, new PhoneState()));
  }

  public deletePhone(siteId:string): Observable<number> {
    return this.siteClient.updatePhone(string, mapObjectProps(phone, new PhoneState()));
  }

}