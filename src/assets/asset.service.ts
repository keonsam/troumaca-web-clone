import {AssetRepository} from "./asset.repository";
import {Observable} from "rxjs/Observable";
import {Assets} from "./assets";
import {AssetKinds} from "./asset.kinds";
import {AssetTypes} from "../asset-types/asset.types";
import {UnitOfMeasure} from "../unit-of-measure/unit.of.measure";
import {AssetPersons} from "./asset.persons";
import {AssetUnionOfPhysicalSites} from "./asset.union.of.physical.sites";
import {Asset} from "./asset";
//import {AssetTypeRepository} from "../asset-types/asset.type.repository";
//import {AssetUnitOfMeasureRepository} from "./assset.unit.of.measure.repository";
//import {AssetSiteRepository} from "./asset.site.repository";
//import {AssetPersonRepository} from "./asset.person.repository";



export class AssetService {

  constructor(private assetRepository: AssetRepository) {
  }

  public getAssets(pageNumber:number, pageSize:number, sortOrder:string):Observable<Assets> {
    return this.assetRepository.getAssets(pageNumber, pageSize, sortOrder);
  }

  public getAssetById(assetId: string): Observable<Asset> {
    return this.assetRepository.getAsset(assetId);
  }

  public getAssetKinds():Observable<AssetKinds> {
    return this.assetRepository.getAssetKinds();
  }

  public findAssetTypes(searchStr: string, pageSize:number):Observable<AssetTypes> {
    return this.assetRepository.findAssetTypes(searchStr, pageSize);
  }

  public findUnitOfMeasures(searchStr: string, pageSize: number):Observable<UnitOfMeasure[]> {
    return this.assetRepository.findUnitOfMeasures(searchStr, pageSize);
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number):Observable<AssetUnionOfPhysicalSites> {
    return this.assetRepository.findUnionOfPhysicalSites(searchStr, pageSize);
  }

  public findPersons(searchStr: string, pageSize: number):Observable<AssetPersons> {
    return this.assetRepository.findPersons(searchStr, pageSize);
  }

  public addAsset(assetModel:Asset):Observable<Asset> {
    return this.assetRepository.addAsset(assetModel);
  }

  public updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.assetRepository.updateAsset(assetId, asset);
  }

  public deleteAsset(assetId: string): Observable<number> {
    return this.assetRepository.deleteAsset(assetId);
  }

}
