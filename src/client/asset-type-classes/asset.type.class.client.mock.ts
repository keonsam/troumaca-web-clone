import {AssetTypeClassClient} from "./asset.type.class.client";
import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {AssetTypeClassStates} from "./asset.type.class.states";

export class AssetTypeClassClientMock extends AssetTypeClassClient {

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassState> {
   return Observable.of(new AssetTypeClassState());  
  }

  public getAssetTypeClasses(pageNumber?: number): Observable<AssetTypeClassStates> {
    return undefined;
  }

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState): Observable<AssetTypeClassState> {
    return null;
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<string> {
    return undefined;
  }

  public updateAssetTypeClass(assetTypeClass): Observable<any> {
    return null
  }
}
