import * as Rx from 'rxjs';
import {EmailRepository} from "./email.repository";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../repository.kind";
import {emails} from "../db";
import {Email} from "./email";
import {calcSkip} from "../../db.util";
import {generateUUID} from "../../uuid.generator";
import {Email} from "../../email-type/email/email";

class EmailDBRepository implements EmailRepository {
  saveEmail(email:Email):Observable<Email> {
    email.siteId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<Email>) {
      emails.insert(email, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(email);
        }
        observer.complete();
      });
    });
  }

  getEmails(pageNumber:number, pageSize:number, order:string):Observable<Email[]> {
    return Rx.Observable.create(function (observer:Observer<Email[]>) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      emails.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getEmailCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      emails.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getEmailById(siteId:string):Observable<Email> {
    return Rx.Observable.create(function (observer:Observer<Email>) {
      let query = {
        "siteId":siteId
      };
      emails.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateEmail(siteId:string, email:Email):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "siteId":siteId
      };
      emails.update(query, email, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  deleteEmail(siteId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "siteId":siteId
      };
      emails.remove(query, {}, function (err:any, numRemoved:number) {
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

class EmailRestRepository implements EmailRepository {

  deleteEmail(siteId:string): Observable<number> {
    return undefined;
  }

  getEmailById(siteId:string): Observable<Email> {
    return undefined;
  }

  getEmailCount(): Observable<number> {
    return undefined;
  }

  getEmails(pageNumber: number, pageSize: number, order: string): Observable<Email[]> {
    return undefined;
  }

  saveEmail(email: Email): Observable<Email> {
    return undefined;
  }

  updateEmail(siteId:string, email:Email): Observable<number> {
    return undefined;
  }
}

export function createEmailRepository(kind?:RepositoryKind):EmailRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new EmailDBRepository();
    case RepositoryKind.Rest:
      return new EmailRestRepository();
    default:
      return new EmailDBRepository();
  }
}
