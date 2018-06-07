import {Observable} from "rxjs/Observable";
import {AssetStates} from "./asset.states";
import {AssetKindStates} from "./asset.kind.states";
import {AssetState} from "./asset.state";
import {AssetTypeState} from "../asset-type/asset.type.state";
import {UnitOfMeasureState} from "../unit-of-measure/unit.of.measure.state";
import {UnionOfPhysicalSiteState} from "../site/union.of.physical.site.state";
import {AssetPersonState} from "./asset.person.state";

export abstract class AssetClient {
  public abstract getAssets(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetStates>;
  public abstract getAssetState(assetId: string):Observable<AssetState>;
  public abstract getAssetKinds():Observable<AssetKindStates>;

  public abstract findAssetTypes(searchStr: string, pageSize: number): Observable <AssetTypeState[]>;
  public abstract findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable <UnionOfPhysicalSiteState[]>;
  public abstract findUnitOfMeasures(searchStr: string, pageSize: number): Observable <UnitOfMeasureState[]>;
  public abstract findPersons(searchStr: string, pageSize: number): Observable <AssetPersonState[]>;

  public abstract addAsset(assetState: AssetState):Observable<AssetState>;
  public abstract updateAsset(assetId: string, assetState: AssetState): Observable<number>;
  public abstract deleteAsset(assetId: string): Observable<number>;

}
