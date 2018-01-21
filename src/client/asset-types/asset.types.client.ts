import {AssetTypeState} from "./asset.type.state";
import {Observable} from "rxjs/Observable";
import {AssetTypeStates} from "./asset.type.states";

export abstract class AssetTypesClient {
  abstract getAssetTypes():Observable<AssetTypeState[]>;
  abstract findAssetTypes(searchStr: string, pageSize:number):Observable<AssetTypeStates>;
}