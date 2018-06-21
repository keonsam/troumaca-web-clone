import 'rxjs/add/operator/map';
import {SiteClient} from '../../client/site/site.client';
import {SiteRepository} from '../../site/site.repository';
import {AssetSiteRepository} from '../../assets/asset.site.repository';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { map, reduce, somethingElse } from 'underscore';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {AssetUnionOfPhysicalSites} from '../../assets/asset.union.of.physical.sites';
import {UnionOfPhysicalSite} from '../../assets/asset.union.of.physical.site';
import {Email} from '../../site/email';
import {EmailState} from '../../client/site/email.state';
import {Emails} from '../../site/emails';
import {StreetAddresses} from '../../site/street.addresses';
import {PostOfficeBox} from '../../site/post.office.box';
import {PostOfficeBoxState} from '../../client/site/post.office.box.state';
import {PostOfficeBoxes} from '../../site/post.office.boxes';
import {Phones} from '../../site/phones';
import {WebSites} from '../../site/web.sites';
import {Phone} from '../../site/phone';
import {PhoneState} from '../../client/site/phone.state';
import {WebSite} from '../../site/web.site';
import {WebSiteState} from '../../client/site/web.site.state';
import {StreetAddress} from '../../site/street.address';
import {StreetAddressState} from '../../client/site/street.address.state';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

export class SiteRepositoryAdapter extends SiteRepository implements AssetSiteRepository {

  constructor(private siteClient: SiteClient) {
    super();
  }

  public getStreetAddresses(pageNumber: number, pageSize: number, sortOrder: string): Observable<StreetAddresses> {
    return this.siteClient
    .getStreetAddressStates(pageNumber, pageSize, sortOrder)
    .map(values => {
      const streetAddresses: StreetAddresses = new StreetAddresses();
      streetAddresses.streetAddresses = map(values.streetAddresses, value => {
        return mapObjectProps(value, new StreetAddress());
      });
      streetAddresses.page = mapObjectProps(values.page, new Page());
      streetAddresses.sort = mapObjectProps(values.sort, new Sort());

      return streetAddresses;
    });

  }

  public getPostOfficeBoxes(pageNumber: number, pageSize: number, sortOrder: string): Observable<PostOfficeBoxes> {
    return this.siteClient
    .getPostOfficeBoxStates(pageNumber, pageSize, sortOrder)
    .map(values => {
      const postOfficeBoxes: PostOfficeBoxes = new PostOfficeBoxes();
      postOfficeBoxes.postOfficeBoxes = map(values.postOfficeBoxes, value => {
        return mapObjectProps(value, new PostOfficeBox());
      });
      postOfficeBoxes.page = mapObjectProps(values.page, new Page());
      postOfficeBoxes.sort = mapObjectProps(values.sort, new Sort());

      return postOfficeBoxes;
    });
  }

  public getEmails(pageNumber: number, pageSize: number, sortOrder: string): Observable<Emails> {
    return this.siteClient
    .getEmailStates(pageNumber, pageSize, sortOrder)
    .map(values => {
      const emails: Emails = new Emails();
      emails.emails = map(values.emails, value => {
        return mapObjectProps(value, new Email());
      });
      emails.page = mapObjectProps(values.page, new Page());
      emails.sort = mapObjectProps(values.sort, new Sort());
      return emails;
    });
  }

  public getWebSites(pageNumber: number, pageSize: number, sortOrder: string): Observable<WebSites> {
    return this.siteClient
    .getWebSiteStates(pageNumber, pageSize, sortOrder)
    .map(values => {
      const webSites: WebSites = new WebSites();
      webSites.webSites = map(values.webSites, value => {
        return mapObjectProps(value, new WebSite());
      });
      webSites.page = mapObjectProps(values.page, new Page());
      webSites.sort = mapObjectProps(values.sort, new Sort());
      return webSites;
    });
  }

  public getStreetAddress(siteId: string): Observable<StreetAddress> {
    return this.siteClient
    .getStreetAddressState(siteId)
    .map(value => {
       return mapObjectProps(value, new StreetAddress());
    });
  }

  public getPostOfficeBox(siteId: string): Observable<PostOfficeBox> {
    return this.siteClient
    .getPostOfficeBoxState(siteId)
    .map(value => {
      return mapObjectProps(value, new PostOfficeBox());
    });
  }

  public getEmail(siteId: string): Observable<Email> {
    return this.siteClient
    .getEmailState(siteId)
    .map(value => {
      return mapObjectProps(value, new Email());
    });
  }

  public getWebSite(siteId: string): Observable<WebSite> {
    return this.siteClient
    .getWebSiteState(siteId)
    .map(value => {
      return mapObjectProps(value, new WebSite());
    });
  }

  public getPhone(siteId: string): Observable<Phone> {
    return this.siteClient
    .getPhoneState(siteId)
    .map(value => {
       return mapObjectProps(value, new Phone());
    });
  }

  public getPhones(pageNumber: number, pageSize: number, sortOrder: string): Observable<Phones> {
    return this.siteClient
    .getPhoneStates(pageNumber, pageSize, sortOrder)
    .map(values => {
      const phones: Phones = new Phones();
      phones.phones = map(values.phones, value => {
        const phone = mapObjectProps(value, new Phone());
        return phone;
      });

      phones.page = mapObjectProps(values.page, new Page());
      phones.sort = mapObjectProps(values.sort, new Sort());
      return phones;
    });
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<AssetUnionOfPhysicalSites> {
    return this.siteClient
      .findUnionOfPhysicalSiteStates(searchStr, pageSize)
      .map(values => {
        const unionOfPhysicalSites: AssetUnionOfPhysicalSites = new AssetUnionOfPhysicalSites();
        unionOfPhysicalSites.unionOfPhysicalSites = map(values.unionOfPhysicalSites, value => {
          return mapObjectProps(value, new UnionOfPhysicalSite());
        });
        return unionOfPhysicalSites;
      });
  }

  public addPhone(phone: Phone): Observable<Phone> {
    return this.siteClient
    .addPhone(mapObjectProps(phone, new PhoneState()))
    .map(phoneState => {
      return mapObjectProps(phoneState, new Phone());
    });
  }

  public addStreetAddress(streetAddress: StreetAddress): Observable<StreetAddress> {
    return this.siteClient
    .addStreetAddress(mapObjectProps(streetAddress, new StreetAddressState()))
    .map(streetAddressState => {
      return mapObjectProps(streetAddressState, new StreetAddress());
    });
  }

  public addEmail(email: Email): Observable<Email> {
    return this.siteClient
    .addEmail(mapObjectProps(email, new EmailState()))
    .map(emailState => {
      return mapObjectProps(emailState, new Email());
    });
  }

  public addPostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox> {
    return this.siteClient
    .addPostOfficeBox(mapObjectProps(postOfficeBox, new PostOfficeBoxState()))
    .map(postOfficeBoxState => {
      return mapObjectProps(postOfficeBoxState, new PostOfficeBox());
    });
  }

  public addWebSite(webSite: WebSite): Observable<WebSite> {
    return this.siteClient
    .addWebSite(mapObjectProps(webSite, new WebSiteState()))
    .map(webSiteState => {
      return mapObjectProps(webSiteState, new WebSite());
    });
  }

  public updateStreetAddress(siteId: string, streetAddress: StreetAddress): Observable<number> {
    return this.siteClient.updateStreetAddress(siteId, mapObjectProps(streetAddress, new StreetAddressState()));
  }

  public updatePostOfficeBox(siteId: string, postOfficeBox: PostOfficeBox): Observable<number> {
    return this.siteClient.updatePostOfficeBox(siteId, mapObjectProps(postOfficeBox, new PostOfficeBoxState()))
  }

  public updateEmail(siteId: string, email: Email): Observable<number> {
    return this.siteClient.updateEmail(siteId, mapObjectProps(email, new EmailState()))
  }

  public updateWebSite(siteId: string, webSite: WebSite): Observable<number> {
    return this.siteClient.updateWebSite(siteId, mapObjectProps(webSite, new WebSiteState()))
  }

  public updatePhone(siteId: string, phone: Phone): Observable<number> {
    return this.siteClient.updatePhone(siteId, mapObjectProps(phone, new PhoneState()));
  }

  public deleteStreetAddress(siteId: string): Observable<number> {
    return this.siteClient.deleteStreetAddress(siteId);
  }

  public deletePostOfficeBox(siteId: string): Observable<number> {
    return this.siteClient.deletePostOfficeBox(siteId);
  }

  public deleteEmail(siteId: string): Observable<number> {
    return this.siteClient.deleteEmail(siteId);
  }

  public deleteWebSite(siteId: string): Observable<number> {
    return this.siteClient.deleteWebSite(siteId);
  }

  public deletePhone(siteId: string): Observable<number> {
    return this.siteClient.deletePhone(siteId);
  }

}
