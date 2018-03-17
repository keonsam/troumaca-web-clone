import {Observable} from "rxjs/Observable";
import {WebSite} from "./web.site";

export interface WebSiteRepository {
  saveWebSite(webSite:WebSite):Observable<WebSite>;

  getWebSites(pageNumber:number, pageSize:number, order:string):Observable<WebSite[]>;

  getWebSiteCount():Observable<number>;

  getWebSiteById(siteId:string):Observable<WebSite>;

  updateWebSite(siteId:string, webSite:WebSite):Observable<number>;

  deleteWebSite(siteId:string):Observable<number>;
}
