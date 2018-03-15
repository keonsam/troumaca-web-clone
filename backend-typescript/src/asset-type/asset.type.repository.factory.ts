import Rx from 'rxjs';
import {AssetTypeRepository} from "./asset.type.repository";
import {Observable} from "rxjs/Observable";
import {AssetType} from "./asset.type";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../repository.kind";
import {assetTypes} from "../db";

class AssetTypeDBRepository implements AssetTypeRepository {
  getAssetTypes(searchStr:string, pageSize:number):Observable<AssetType[]> {
    let searchStrLocal = new RegExp(searchStr);
    return Rx.Observable.create(function (observer:Observer<AssetType[]>) {
      assetTypes.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }
}

class AssetTypeRestRepository implements AssetTypeRepository {
  getAssetTypes(searchStr:string, pageSize:number): Observable<AssetType[]> {
    return undefined;
  }
}

export function createAssetTypeRepository(kind?:RepositoryKind):AssetTypeRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new AssetTypeDBRepository();
    case RepositoryKind.Rest:
      return new AssetTypeRestRepository();
    default:
      return new AssetTypeDBRepository();
  }
}