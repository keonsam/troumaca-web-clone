import {AssetTypeRepository} from "./asset.type.repository";
import {Observable} from "rxjs/Observable";
import {AssetType} from "./asset.type";
import {AssetTypes} from "./asset.types";
import {Value} from "./value";
import {Values} from "./values";
import {AssetTypeClass} from "../asset-type-classes/asset.type.class";
import {AssetTypeClasses} from "../asset-type-classes/asset.type.classes";
import {UnitOfMeasure} from "../unit-of-measure/unit.of.measure";
import {AssignedAttribute} from "../asset-type-classes/assigned.attribute";
import {AssetTypeResponse} from "./asset.type.response";

export class AssetTypeService {
  constructor(private assetTypeRepository: AssetTypeRepository) {
  }

  public getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypes> {
    return this.assetTypeRepository.getAssetTypes(pageNumber, pageSize, sortOrder);
  }

  public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    return this.assetTypeRepository.getAssignedAttributes(assetTypeClassId);
  }

  public getValues(assetTypeId: string): Observable<Values> {
    return this.assetTypeRepository.getValues(assetTypeId);
  }

  public getAssetType(assetTypeId: string):Observable<AssetTypeResponse> {
    return this.assetTypeRepository.getAssetType(assetTypeId);
  }

  public getAssetTypeClass(assetTypeClassId: string):Observable<AssetTypeClass> {
    return this.assetTypeRepository.getAssetTypeClass(assetTypeClassId);
  }

  public findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClasses> {
    return this.assetTypeRepository.findAssetTypeClassId(searchStr, pageSize);
  }

  public findUnitOfMeasureId(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.assetTypeRepository.findUnitOfMeasureId(searchStr, pageSize);
  }

  public addAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
    return this.assetTypeRepository.addAssetType(assetType, values);
  }

  // public addValue(value: Value[]): Observable<Value[]> {
  //   return this.assetTypeRepository.addValue(value);
  // }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId);
  }

  public deleteValue(valueId: string): Observable<number> {
    return this.assetTypeRepository.deleteValue(valueId);
  }

  public updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType, values);
  }

  // public updateValue(assetTypeId, value: Value[]): Observable<number> {
  //   return this.assetTypeRepository.updateValue(assetTypeId,value);
  // }

}
