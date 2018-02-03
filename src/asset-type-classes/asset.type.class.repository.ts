import {AssetTypeClass} from "./asset.type.class";
import {Observable} from "rxjs/Observable";
import {AssetTypeClasses} from "./asset.type.classes";

export abstract class AssetTypeClassRepository {

  abstract getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass>

  abstract getAssetTypeClasses(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypeClasses>;

  abstract addAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass>;

  abstract deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

  abstract updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass): Observable<number>;
}
