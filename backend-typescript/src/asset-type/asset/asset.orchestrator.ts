import {createAssetRepository} from './asset.repository.factory';
import {shapeAssetsResponse} from "./asset.response.shaper";
import {getSortOrderOrDefault} from '../../sort.order.util';
import {AssetRepository} from "./asset.repository";
import {Observable} from "rxjs/Observable";
import { forkJoin } from "rxjs/observable/forkJoin";
import {Asset} from "./asset";
import {Result} from "../../result.success";

export class AssetOrchestrator {

  private assetRepository:AssetRepository;

  constructor(options?:any) {
    this.assetRepository = createAssetRepository(options);
  }

  saveAsset(asset:Asset):Observable<Asset> {
    return this.assetRepository.saveAsset(asset);
  };

  getAssetCount():Observable<number> {
    return this.assetRepository.getAssetCount();
  }

  getAssets(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.assetRepository
    .getAssets(number, size, sort)
    .flatMap(value => {
      return this.assetRepository
        .getAssetCount()
        .map(count => {
          let shapeAssetsResponse1:any = shapeAssetsResponse(value, number, size, value.length, count, sort);
          return new Result<any>(false, "assets", shapeAssetsResponse1);
        });
    });

    // let assetsObs:Observable<Asset[]> = this.assetRepository.getAssets(number, size, sort);
    // let assetCountObs:Observable<number> = this.assetRepository.getAssetCount();

    // return forkJoin([assetsObs, assetCountObs]).map(results => {
    //   let assets:Asset[] = results[0];
    //   let assetCount:number = results[1];
    //   let shapeAssetsResponse1:any = shapeAssetsResponse(results[0].length, number, size, assets.length, assetCount, sort);
    //   return new Result<any>(false, "assets", shapeAssetsResponse1);
    // });

  }

  getAssetById(assetId:string):Observable<Asset> {
    return this.assetRepository.getAssetById(assetId);
  }

  updateAsset(assetId:string, asset:Asset):Observable<number> {
    return this.assetRepository.updateAsset(assetId, asset);
  }

  deleteAsset(assetId:string):Observable<number> {
    return this.assetRepository.deleteAsset(assetId);
  }

}

