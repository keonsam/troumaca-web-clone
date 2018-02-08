import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {AssetTypeClassStates} from "./asset.type.class.states";


export abstract class AssetTypeClassClient {

  abstract getAssetTypeClass(assetTypeClassId: string) : Observable<AssetTypeClassState>;

  abstract getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string) :Observable<AssetTypeClassStates>;

  abstract addAssetTypeClass(assetTypeClassState: AssetTypeClassState):Observable<AssetTypeClassState>;

  abstract deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

  abstract updateAssetTypeClass(assetTypeClassId: string, assetTypeClassState: AssetTypeClassState) : Observable<number>;
}