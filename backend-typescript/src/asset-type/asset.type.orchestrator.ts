import {createAssetTypeRepository} from './asset.type.repository.factory';
import {AssetTypeRepository} from "./asset.type.repository";
import {Observable} from "rxjs/Observable";
import {AssetType} from "./asset.type";
import {shapeAssetTypesResponse} from "./asset.type.response.shaper";
import {Result} from "../result.success";
import {getSortOrderOrDefault} from "../sort.order.util";


export class AssetTypeOrchestrator {

  private assetTypeRepository:AssetTypeRepository;

  constructor(options?:any) {
    this.assetTypeRepository = createAssetTypeRepository(options);
  }

  findAssetTypes(searchStr:string, pageSize:number):Observable<AssetType[]> {
    return this.assetTypeRepository.findAssetTypes(searchStr, pageSize);
  }

  saveAssetType(assetType:AssetType):Observable<AssetType> {
    return this.assetTypeRepository.saveAssetType(assetType);
  };

  getAssetTypeCount():Observable<number> {
    return this.assetTypeRepository.getAssetTypeCount();
  }

  getAssetTypes(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.assetTypeRepository
      .getAssetTypes(number, size, sort)
      .flatMap(value => {
        return this.assetTypeRepository
          .getAssetTypeCount()
          .map(count => {
            let shapeAssetTypesResp:any = shapeAssetTypesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "assetTypes", shapeAssetTypesResp);
          });
      });

  }

  getAssetTypeById(assetTypeId:string):Observable<AssetType> {
    return this.assetTypeRepository.getAssetTypeById(assetTypeId);
  }

  updateAssetType(assetTypeId:string, assetType:AssetType):Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType);
  }

  deleteAssetType(assetTypeId:string):Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId);
  }

}
