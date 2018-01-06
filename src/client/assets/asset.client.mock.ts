import {AssetClient} from "./asset.client";
import {Observable} from "rxjs/Observable";
import {AssetStates} from "./asset.states";
import {AssetKindStates} from "./asset.kind.states";
import {AssetState} from "./asset.state";
// import {AssetTypeStates} from "./asset.type.states";

export class AssetClientMock extends AssetClient {
  getAssets(pageNumber:number): Observable<AssetStates> {
    return undefined;
  }

  getAssetKinds(): Observable<AssetKindStates> {
    return null;
  }

  // public findAssetTypes(searchStr: string): Observable<AssetTypeStates> {
  //   return null;
  // }

  public addInventoryAsset(assetState: AssetState): Observable<AssetState> {
    return null;
  }

  public addDiscreteAsset(assetState: AssetState): Observable<AssetState> {
    return null;
  }
}