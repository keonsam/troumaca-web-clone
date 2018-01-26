import {AssetTypeClass} from "./asset.type.class";
import {Observable} from "rxjs/Observable";
import {AssetTypeClasses} from "./asset.type.classes";

export abstract class AssetTypeClassRepository {
  abstract getAssetTypeClasses(pageNumber?:number):Observable<AssetTypeClasses>;

  abstract addAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass>;

  abstract deleteAssetTypeClass(id: string): Observable<string>;
  
}
