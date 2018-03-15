import Rx from "rxjs";
import {dataTypes} from "../db";
import {DataTypeRepository} from "./data.type.repository";
import {DataType} from "./data.type";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../repository.kind";
import {Observer} from "rxjs/Observer";

class DataTypeDBRepository implements DataTypeRepository {
  getDataTypes():Observable<DataType> {
    return Rx.Observable.create(function (observer:Observer<DataType>) {
      dataTypes.find({}, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };
}

class DataTypeRestRepository implements DataTypeRepository {
  getDataTypes(): Observable<DataType> {
    return undefined;
  }
}

export function createDataTypeRepository(kind?:RepositoryKind) {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new DataTypeDBRepository();
    case RepositoryKind.Rest:
      return new DataTypeRestRepository();
    default:
      return new DataTypeDBRepository();
  }
}