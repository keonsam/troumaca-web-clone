import {AssetTypeClassClient} from "./asset.type.class.client";
import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {AssetTypeClassStates} from "./asset.type.class.states";

export class AssetTypeClassClientMock extends AssetTypeClassClient {

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassState> {
   return null;
  }

  public getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string): Observable<AssetTypeClassStates> {
    return undefined;
  }

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState): Observable<AssetTypeClassState> {
    return null;
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return undefined;
  }

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClassState): Observable<number> {
    return null
  }
}
