import {Observable} from "rxjs/Observable";
import {Assets} from "./assets";
import {AssetKinds} from "./asset.kinds";
import {AssetTypes} from "../asset-types/asset.types";
import {UnitOfMeasures} from "./asset.unit.of.measures";
import {AssetUnionOfPhysicalSites} from "./asset.union.of.physical.sites";
import {AssetPersons} from "./asset.persons";
import {Asset} from "./asset";

export abstract class AssetRepository {

  public abstract getAssets(pageNumber:number, pageSize:number, sortOrder:string):Observable<Assets>;
  public abstract getAsset(attributeId: string): Observable<Asset>;
  public abstract getAssetKinds():Observable<AssetKinds>;

  public abstract findAssetTypes(searchStr: string, pageSize: number): Observable<AssetTypes>;
  public abstract findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasures>;
  public abstract findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<AssetUnionOfPhysicalSites>;
  public abstract findPersons(searchStr: string, pageSize: number): Observable<AssetPersons>;

  public abstract addAsset(assetModel: Asset):Observable<Asset>;
  public abstract updateAsset(assetId: string, asset: Asset): Observable<number>;
  public abstract deleteAsset(assetId): Observable<number>;
}
