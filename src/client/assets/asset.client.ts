import {Observable} from "rxjs/Observable";
import {AssetStates} from "./asset.states";
import {AssetKindStates} from "./asset.kind.states";
import {AssetState} from "./asset.state";

export abstract class AssetClient {
  public abstract getAssets(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetStates>;
  public abstract getAssetKinds():Observable<AssetKindStates>;
  public abstract addAsset(assetState: AssetState):Observable<AssetState>;
}
