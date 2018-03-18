import * as Rx from 'rxjs';
import {WebSiteRepository} from "./web.site.repository";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../repository.kind";
import {websites} from "../../db";
import {WebSite} from "./web.site";
import {calcSkip} from "../../db.util";
import {generateUUID} from "../../uuid.generator";

class WebSiteDBRepository implements WebSiteRepository {

  private defaultPageSize:number = 10;

  saveWebSite(webSite:WebSite):Observable<WebSite> {
    webSite.siteId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<WebSite>) {
      websites.insert(webSite, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(webSite);
        }
        observer.complete();
      });
    });
  }

  getWebSites(pageNumber:number, pageSize:number, order:string):Observable<WebSite[]> {
    let localDefaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer:Observer<WebSite[]>) {
      let skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      websites.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getWebSiteCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      websites.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getWebSiteById(siteId:string):Observable<WebSite> {
    return Rx.Observable.create(function (observer:Observer<WebSite>) {
      let query = {
        "siteId":siteId
      };
      websites.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateWebSite(siteId:string, webSite:WebSite):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "siteId":siteId
      };
      websites.update(query, webSite, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  deleteWebSite(siteId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "siteId":siteId
      };
      websites.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

}

class WebSiteRestRepository implements WebSiteRepository {

  deleteWebSite(siteId:string): Observable<number> {
    return undefined;
  }

  getWebSiteById(siteId:string): Observable<WebSite> {
    return undefined;
  }

  getWebSiteCount(): Observable<number> {
    return undefined;
  }

  getWebSites(pageNumber: number, pageSize: number, order: string): Observable<WebSite[]> {
    return undefined;
  }

  saveWebSite(webSite: WebSite): Observable<WebSite> {
    return undefined;
  }

  updateWebSite(siteId:string, webSite:WebSite): Observable<number> {
    return undefined;
  }
}

export function createWebSiteRepository(kind?:RepositoryKind):WebSiteRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new WebSiteDBRepository();
    case RepositoryKind.Rest:
      return new WebSiteRestRepository();
    default:
      return new WebSiteDBRepository();
  }
}
