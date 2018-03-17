import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {AssetTypeClass} from "./asset.type.class";

import {createAssetTypeClassesRepositoryFactory} from './asset.type.class.repository.factory';
import {AssetTypeClassRepository} from "./asset.type.class.repository";
import {shapeAssetTypeClasssResponse} from "./asset.type.class.response.shaper";
import {Result} from "../../result.success";
import {AssetType} from "../asset.type";

export class AssetTypeClassOrchestrator {

  private assetTypeClassRepository:AssetTypeClassRepository;

  constructor() {
    this.assetTypeClassRepository = createAssetTypeClassesRepositoryFactory();
  }

  findAssetTypeClass(searchStr:string, pageSize:number):Observable<AssetTypeClass[]> {
    return this.assetTypeClassRepository.findAssetTypeClass(searchStr, pageSize);
  }

  getAssetTypeClasses(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort = getSortOrderOrDefault(field, direction);
    return this.assetTypeClassRepository
    .getAssetTypeClasses(number, size, sort)
    .flatMap(value => {
      return this.assetTypeClassRepository
        .getAssetTypeClassCount()
        .map(count => {
          let shapeAssetTypeClasssResp = shapeAssetTypeClasssResponse("assetTypeClasses",value, number, size, value.length, count, sort);
          return new Result(false, "", shapeAssetTypeClasssResp);
        });
    });
  }

  getAssetTypeClass(assetTypeClassId:string):Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.getAssetTypeClass(assetTypeClassId);
  }

  saveAssetTypeClass(assetTypeClass:AssetTypeClass):Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.saveAssetTypeClass(assetTypeClass);
  }

  deleteAssetTypeClass(assetTypeClassId:string):Observable<number> {
    return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId);
  }

  updateAssetTypeClass(assetTypeClassId:string, assetTypeClass:AssetTypeClass):Observable<number> {
    return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass);
  }

}
