import * as Rx from 'rxjs';
import {PhoneRepository} from "./phone.repository";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../repository.kind";
import {phones} from "../db";
import {Phone} from "./phone";
import {calcSkip} from "../../db.util";
import {generateUUID} from "../../uuid.generator";
import {Phone} from "../../phone-type/phone/phone";

class PhoneDBRepository implements PhoneRepository {
  savePhone(phone:Phone):Observable<Phone> {
    phone.siteId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<Phone>) {
      phones.insert(phone, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(phone);
        }
        observer.complete();
      });
    });
  }

  getPhones(pageNumber:number, pageSize:number, order:string):Observable<Phone[]> {
    return Rx.Observable.create(function (observer:Observer<Phone[]>) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      phones.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getPhoneCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      phones.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getPhoneById(siteId:string):Observable<Phone> {
    return Rx.Observable.create(function (observer:Observer<Phone>) {
      let query = {
        "siteId":siteId
      };
      phones.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updatePhone(siteId:string, phone:Phone):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "siteId":siteId
      };
      phones.update(query, phone, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  deletePhone(siteId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "siteId":siteId
      };
      phones.remove(query, {}, function (err:any, numRemoved:number) {
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

class PhoneRestRepository implements PhoneRepository {

  deletePhone(siteId:string): Observable<number> {
    return undefined;
  }

  getPhoneById(siteId:string): Observable<Phone> {
    return undefined;
  }

  getPhoneCount(): Observable<number> {
    return undefined;
  }

  getPhones(pageNumber: number, pageSize: number, order: string): Observable<Phone[]> {
    return undefined;
  }

  savePhone(phone: Phone): Observable<Phone> {
    return undefined;
  }

  updatePhone(siteId:string, phone:Phone): Observable<number> {
    return undefined;
  }
}

export function createPhoneRepository(kind?:RepositoryKind):PhoneRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new PhoneDBRepository();
    case RepositoryKind.Rest:
      return new PhoneRestRepository();
    default:
      return new PhoneDBRepository();
  }
}
