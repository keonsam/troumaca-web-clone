import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {AssetTypeClassStates} from "./asset.type.class.states";


export abstract class AssetTypeClassClient {
  abstract getAssetTypeClasses(pageNumber?: number) :Observable<AssetTypeClassStates>;

  abstract addAssetTypeClass(assetTypeClassState: AssetTypeClassState):Observable<AssetTypeClassState>;
}
