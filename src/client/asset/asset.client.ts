import {Observable} from "rxjs/Observable";
import {AssetStates} from "./asset.states";
import {AssetKindStates} from "./asset.kind.states";
import {AssetState} from "./asset.state";
import {AssetTypeStates} from "../asset-type/asset.type.states";
import {UnitOfMeasureState} from "../unit-of-measure/unit.of.measure.state";
import {UnionOfPhysicalSiteStates} from "../site/union.of.physical.site.states";
import {PersonStates} from "../party/person.states";

export abstract class AssetClient {
  public abstract getAssets(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetStates>;
  public abstract getAssetState(assetId: string):Observable<AssetState>;
  public abstract getAssetKinds():Observable<AssetKindStates>;

  public abstract findAssetTypes(searchStr: string, pageSize: number): Observable <AssetTypeStates>;
  public abstract findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable <UnionOfPhysicalSiteStates>;
  public abstract findUnitOfMeasures(searchStr: string, pageSize: number): Observable <UnitOfMeasureState[]>;
  public abstract findPersons(searchStr: string, pageSize: number): Observable <PersonStates>;

  public abstract addAsset(assetState: AssetState):Observable<AssetState>;
  public abstract updateAsset(assetId: string, assetState: AssetState): Observable<number>;
  public abstract deleteAsset(assetId: string): Observable<number>;

}
