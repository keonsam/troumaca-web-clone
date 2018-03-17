import * as Rx from "rxjs";
import {AttributeRepository} from "./attribute.repository";
import {Observable} from "rxjs/Observable";

import {generateUUID} from "../../uuid.generator";
import {calcSkip} from "../../db.util";
import {Observer} from "rxjs/Observer";
import {Attribute} from "./attribute";
import {RepositoryKind} from "../../repository.kind";
import {attributes} from "../../db";

let defaultPageSize:number = 10;

class AttributeDBRepository implements AttributeRepository {

  getAvailableAttributes(pageNumber:number, pageSize:number, order:string, availableAttributes:Attribute[]):Observable<Attribute[]> {
    return Rx.Observable.create(function (observer:Observer<Attribute[]>) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      attributes.find({ attributeId: { $nin: availableAttributes }}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssignedAttributes(pageNumber:number, pageSize:number, order:string, assignedAttributes:string[]):Observable<Attribute[]> {
    return Rx.Observable.create(function (observer:Observer<Attribute[]>) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      attributes.find({ attributeId: { $in: assignedAttributes }}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAvailableAttributeCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      attributes.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAvailableAttribute(attributeId:string):Observable<Attribute> {
    return Rx.Observable.create(function (observer:Observer<Attribute>) {
      let query = {
        "attributeId":attributeId
      };

      attributes.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  saveAvailableAttribute(availableAttribute:Attribute):Observable<Attribute> {
    availableAttribute.attributeId = generateUUID();
    return Rx.Observable.create(function (observer:Observer<Attribute>) {
      attributes.insert(availableAttribute, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteAvailableAttribute(attributeId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "attributeId":attributeId
      };

      attributes.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  updateAvailableAttribute(attributeId:string, attribute:Attribute):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "attributeId":attributeId
      };
      attributes.update(query, attribute, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  addAttribute(attribute: Attribute): Observable<Attribute> {
    attribute.attributeId = generateUUID();
    return Rx.Observable.create(function (observer:Observer<Attribute>) {
      attributes.insert(attribute, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteAttribute(attributeId:string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "attributeId":attributeId
      };

      attributes.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getAttributeById(attributeId: string): Observable<Attribute> {
    return Rx.Observable.create(function (observer:Observer<Attribute>) {
      let query = {
        "attributeId":attributeId
      };

      attributes.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAttributeCount(): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      attributes.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });

  }

  getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]> {
    return Rx.Observable.create(function (observer:Observer<Attribute[]>) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      attributes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateAttribute(attributeId: string, attribute: Attribute): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "attributeId":attributeId
      };

      attributes.update(query, attribute, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });

  }



}


class AttributeRestRepository implements AttributeRepository {

  deleteAvailableAttribute(attributeId: string): Observable<number> {
    return undefined;
  }

  getAssignedAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[]): Observable<Attribute[]> {
    return undefined;
  }

  getAvailableAttribute(attributeId: string): Observable<Attribute> {
    return undefined;
  }

  getAvailableAttributeCount(): Observable<number> {
    return undefined;
  }

  getAvailableAttributes(pageNumber: number, pageSize: number, order: string, availableAttributes: Attribute[]): Observable<Attribute[]> {
    return undefined;
  }

  saveAvailableAttribute(availableAttribute: Attribute): Observable<Attribute> {
    return undefined;
  }

  updateAvailableAttribute(attributeId: string, attribute: Attribute): Observable<number> {
    return undefined;
  }

  addAttribute(attribute: Attribute): Observable<Attribute> {
    return undefined;
  }

  deleteAttribute(attributeId:string): Observable<number> {
    return undefined;
  }

  getAttributeById(attributeId: string): Observable<Attribute> {
    return undefined;
  }

  getAttributeCount(): Observable<number> {
    return undefined;
  }

  getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]> {
    return undefined;
  }

  updateAttribute(attributeId: string, attribute: Attribute): Observable<number> {
    return undefined;
  }

}


export function createAttributeRepositoryFactory(kind?:RepositoryKind):AttributeRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new AttributeDBRepository();
    case RepositoryKind.Rest:
      return new AttributeRestRepository();
    default:
      return new AttributeDBRepository();
  }
}
