import {AssetTypeClassClient} from "./asset.type.class.client";
import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";

export class AssetTypeClassClientMock extends AssetTypeClassClient {
  public getAssetTypeClasses(): Observable<AssetTypeClassState[]> {
    return undefined;
  }

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState): Observable<AssetTypeClassState> {
    return null;
  }
}
