// import {SiteClient} from '../../client/site/site.client';
// import {SiteRepository} from '../../site/site.repository';
// import {Observable} from 'rxjs';
// import {Email} from '../../site/email';
// import {Emails} from '../../site/emails';
// import {StreetAddresses} from '../../site/street.addresses';
// import {PostOfficeBox} from '../../site/post.office.box';
// import {PostOfficeBoxes} from '../../site/post.office.boxes';
// import {Phones} from '../../site/phones';
// import {WebSites} from '../../site/web.sites';
// import {Phone} from '../../site/phone';
// import {WebSite} from '../../site/web.site';
// import {StreetAddress} from '../../site/street.address';
//
// export class SiteRepositoryAdapter extends SiteRepository {
//
//   constructor(private siteClient: SiteClient) {
//     super();
//   }
//
//   public getStreetAddresses(pageNumber: number, pageSize: number, sortOrder: string): Observable<StreetAddresses> {
//     return this.siteClient.getStreetAddressStates(pageNumber, pageSize, sortOrder);
//   }
//
//   public getPostOfficeBoxes(pageNumber: number, pageSize: number, sortOrder: string): Observable<PostOfficeBoxes> {
//     return this.siteClient.getPostOfficeBoxStates(pageNumber, pageSize, sortOrder);
//   }
//
//   public getEmails(pageNumber: number, pageSize: number, sortOrder: string): Observable<Emails> {
//     return this.siteClient.getEmailStates(pageNumber, pageSize, sortOrder);
//   }
//
//   public getWebSites(pageNumber: number, pageSize: number, sortOrder: string): Observable<WebSites> {
//     return this.siteClient.getWebSiteStates(pageNumber, pageSize, sortOrder);
//   }
//
//   public getStreetAddress(siteId: string): Observable<StreetAddress> {
//     return this.siteClient.getStreetAddressState(siteId);
//   }
//
//   public getPostOfficeBox(siteId: string): Observable<PostOfficeBox> {
//     return this.siteClient.getPostOfficeBoxState(siteId);
//   }
//
//   public getEmail(siteId: string): Observable<Email> {
//     return this.siteClient.getEmailState(siteId);
//   }
//
//   public getWebSite(siteId: string): Observable<WebSite> {
//     return this.siteClient.getWebSiteState(siteId);
//   }
//
//   public getPhone(siteId: string): Observable<Phone> {
//     return this.siteClient.getPhoneState(siteId);
//   }
//
//   public getPhones(pageNumber: number, pageSize: number, sortOrder: string): Observable<Phones> {
//     return this.siteClient.getPhoneStates(pageNumber, pageSize, sortOrder);
//   }
//
//   public addPhone(phone: Phone): Observable<Phone> {
//     return this.siteClient.addPhone(phone);
//   }
//
//   public addStreetAddress(streetAddress: StreetAddress): Observable<StreetAddress> {
//     return this.siteClient.addStreetAddress(streetAddress);
//   }
//
//   public addEmail(email: Email): Observable<Email> {
//     return this.siteClient.addEmail(email);
//   }
//
//   public addPostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox> {
//     return this.siteClient
//     .addPostOfficeBox(postOfficeBox);
//   }
//
//   public addWebSite(webSite: WebSite): Observable<WebSite> {
//     return this.siteClient
//     .addWebSite(webSite);
//   }
//
//   public updateStreetAddress(siteId: string, streetAddress: StreetAddress): Observable<number> {
//     return this.siteClient.updateStreetAddress(siteId, streetAddress);
//   }
//
//   public updatePostOfficeBox(siteId: string, postOfficeBox: PostOfficeBox): Observable<number> {
//     return this.siteClient.updatePostOfficeBox(siteId, postOfficeBox)
//   }
//
//   public updateEmail(siteId: string, email: Email): Observable<number> {
//     return this.siteClient.updateEmail(siteId, email);
//   }
//
//   public updateWebSite(siteId: string, webSite: WebSite): Observable<number> {
//     return this.siteClient.updateWebSite(siteId, webSite)
//   }
//
//   public updatePhone(siteId: string, phone: Phone): Observable<number> {
//     return this.siteClient.updatePhone(siteId, phone);
//   }
//
//   public deleteStreetAddress(siteId: string): Observable<number> {
//     return this.siteClient.deleteStreetAddress(siteId);
//   }
//
//   public deletePostOfficeBox(siteId: string): Observable<number> {
//     return this.siteClient.deletePostOfficeBox(siteId);
//   }
//
//   public deleteEmail(siteId: string): Observable<number> {
//     return this.siteClient.deleteEmail(siteId);
//   }
//
//   public deleteWebSite(siteId: string): Observable<number> {
//     return this.siteClient.deleteWebSite(siteId);
//   }
//
//   public deletePhone(siteId: string): Observable<number> {
//     return this.siteClient.deletePhone(siteId);
//   }
//
// }
