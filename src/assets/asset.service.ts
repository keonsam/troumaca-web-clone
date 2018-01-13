import {AssetRepository} from "./asset.repository";
import {Observable} from "rxjs/Observable";
import {Assets} from "./assets";
import {AssetKinds} from "./asset.kinds";
import {AssetTypes} from "./asset.types";
import {AssetTypesRepository} from "../asset-types/asset.types.repository";
import {AssetUnitOfMeasures} from "./asset.unit.of.measures";
import {AssetUnitOfMeasureRepository} from "./assset.unit.of.measure.repository";
import {AssetSiteRepository} from "./asset.site.repository";
import {AssetUnionOfPhysicalSites} from "./asset.union.of.physical.sites";
import {AssetPersonRepository} from "./asset.person.repository";
import {AssetPersons} from "./asset.persons";
import {Asset} from "./asset";


export class AssetService {

  constructor(private assetsRepository: AssetRepository,
              private assetTypesRepository: AssetTypesRepository,
              private assetUnitOfMeasureRepository:AssetUnitOfMeasureRepository,
              private assetSiteRepository:AssetSiteRepository,
              private assetPersonRepository:AssetPersonRepository) {
  }

  public getAssets(pageNumber?:number):Observable<Assets> {
    return this.assetsRepository.getAssets(pageNumber);
  }

  public getAssetKinds():Observable<AssetKinds> {
    return this.assetsRepository.getAssetKinds();
  }

  public findAssetTypes(searchStr: string, pageSize:number):Observable<AssetTypes> {
    return this.assetTypesRepository.findAssetTypes(searchStr, pageSize);
  }

  public findUnitOfMeasures(searchStr: string, pageSize: number):Observable<AssetUnitOfMeasures> {
    return this.assetUnitOfMeasureRepository.findUnitOfMeasures(searchStr, pageSize);
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number):Observable<AssetUnionOfPhysicalSites> {
    return this.assetSiteRepository.findUnionOfPhysicalSites(searchStr, pageSize);
  }

  public findPersons(searchStr: string, pageSize: number):Observable<AssetPersons> {
    return this.assetPersonRepository.findPersons(searchStr, pageSize);
  }

  public addInventoryAsset(assetModel:Asset):Observable<Asset> {
    return this.assetsRepository.addInventoryAsset(assetModel);
  }

  public addDiscreteAsset(assetModel:Asset):Observable<Asset> {
    return this.assetsRepository.addDiscreteAsset(assetModel);
  }

  /*public addAsset(makeAsset: any): Observable<any> {
    return console.log(makeAsset);
  } */

}
