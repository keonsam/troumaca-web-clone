import {AssetRepository} from "./asset.repository";
import {Observable} from "rxjs/Observable";
import {Assets} from "./assets";
import {AssetKinds} from "./asset.kinds";
import {AssetTypes} from "../asset-types/asset.types";
import {AssetTypeRepository} from "../asset-types/asset.type.repository";
import {UnitOfMeasures} from "./asset.unit.of.measures";
import {AssetUnitOfMeasureRepository} from "./assset.unit.of.measure.repository";
import {AssetSiteRepository} from "./asset.site.repository";
import {AssetUnionOfPhysicalSites} from "./asset.union.of.physical.sites";
import {AssetPersonRepository} from "./asset.person.repository";
import {AssetPersons} from "./asset.persons";
import {Asset} from "./asset";


export class AssetService {

  constructor(private assetRepository: AssetRepository,
              private assetTypeRepository: AssetTypeRepository,
              private assetUnitOfMeasureRepository:AssetUnitOfMeasureRepository,
              private assetSiteRepository:AssetSiteRepository,
              private assetPersonRepository:AssetPersonRepository) {
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
    return this.assetTypeRepository.findAssetTypes(searchStr, pageSize);
  }

  public findUnitOfMeasures(searchStr: string, pageSize: number):Observable<UnitOfMeasures> {
    return this.assetUnitOfMeasureRepository.findUnitOfMeasures(searchStr, pageSize);
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number):Observable<AssetUnionOfPhysicalSites> {
    return this.assetSiteRepository.findUnionOfPhysicalSites(searchStr, pageSize);
  }

  public findPersons(searchStr: string, pageSize: number):Observable<AssetPersons> {
    return this.assetPersonRepository.findPersons(searchStr, pageSize);
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
