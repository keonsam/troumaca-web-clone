// import {Observable} from 'rxjs';
// import {Emails} from './emails';
// import {StreetAddresses} from './street.addresses';
// import {PostOfficeBoxes} from './post.office.boxes';
// import {Phones} from './phones';
// import {WebSites} from './web.sites';
// import {Phone} from './phone';
// import {StreetAddress} from './street.address';
// import {PostOfficeBox} from './post.office.box';
// import {Email} from './email';
// import {WebSite} from './web.site';
//
// export abstract class SiteRepository {
//   abstract getPostOfficeBoxes(pageNumber: number, pageSize: number, sortOrder: string): Observable<PostOfficeBoxes>;
//   abstract getStreetAddresses(pageNumber: number, pageSize: number, sortOrder: string): Observable<StreetAddresses>;
//   abstract getEmails(pageNumber: number, pageSize: number, sortOrder: string): Observable<Emails>;
//   abstract getPhones(pageNumber: number, pageSize: number, sortOrder: string): Observable<Phones>;
//   abstract getWebSites(pageNumber: number, pageSize: number, sortOrder: string): Observable<WebSites>;
//
//   abstract getStreetAddress(siteId: string): Observable<StreetAddress>;
//   abstract getPostOfficeBox(siteId: string): Observable<PostOfficeBox>;
//   abstract getEmail(siteId: string): Observable<Email>;
//   abstract getWebSite(siteId: string): Observable<WebSite>;
//   abstract getPhone(siteId: string): Observable<Phone>;
//
//   abstract addPhone(phone: Phone): Observable<Phone>;
//   abstract addStreetAddress(streetAddress: StreetAddress): Observable<StreetAddress>;
//   abstract addPostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox>;
//   abstract addEmail(email: Email): Observable<Email>;
//   abstract addWebSite(webSite: WebSite): Observable<WebSite>;
//
//   abstract updateStreetAddress(siteId: string, streetAddress: StreetAddress): Observable<number>;
//   abstract updatePostOfficeBox(siteId: string, postOfficeBox: PostOfficeBox): Observable<number>;
//   abstract updateEmail(siteId: string, email: Email): Observable<number>;
//   abstract updateWebSite(siteId: string, webSite: WebSite): Observable<number>;
//   abstract updatePhone(siteId: string, phone: Phone): Observable<number>;
//
//   abstract deleteStreetAddress(siteId: string): Observable<number>;
//   abstract deletePostOfficeBox(siteId: string): Observable<number>;
//   abstract deleteEmail(siteId: string): Observable<number>;
//   abstract deleteWebSite(siteId: string): Observable<number>;
//   abstract deletePhone(siteId: string): Observable<number>;
//
// }
