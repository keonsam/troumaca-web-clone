import {AssetClient} from "./asset.client";
import {Observable} from "rxjs/Observable";
import {AssetStates} from "./asset.states";
import {AssetKindStates} from "./asset.kind.states";
import {AssetState} from "./asset.state";
// import {AssetTypeStates} from "./asset.type.states";
import {AssetTypeStates} from "../asset-type/asset.type.states";
import {UnitOfMeasureStates} from "../unit-of-measure/unit.of.measure.states";
import {UnionOfPhysicalSiteStates} from "../site/union.of.physical.site.states";
import {PersonStates} from "../party/person.states";

export class AssetClientMock extends AssetClient {
  getAssets(pageNumber:number, pageSize:number, sortOrder:string): Observable<AssetStates> {
    return undefined;
  }

  getAssetKinds(): Observable<AssetKindStates> {
    return null;
  }

  getAssetState(assetId: string): Observable<AssetState> {
    return null;
  }

  public findAssetTypes(searchStr: string, pageSize: number): Observable<AssetTypeStates> {
    return null;
  }

  public findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasureStates> {
    return null;
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSiteStates> {
    return null;
  }

  public findPersons(searchStr: string, pageSize: number): Observable<PersonStates> {
    return null;
  }

  public addAsset(assetState: AssetState): Observable<AssetState> {
    return null;
  }

  public updateAsset(assetId: string, asset: AssetState): Observable<number> {
   return null;
 }

 public deleteAsset(assetId: string): Observable<number> {
   return null;
 }

}
