import {AssetTypeRepository} from "./asset.type.repository";
import {Observable} from "rxjs/Observable";
import {AssetType} from "./asset.type";
import {AssetTypes} from "./asset.types";
import {Value} from "./value";
import {Values} from "./values";
import {Attributes} from "../attributes/attributes";
import {AssetTypeClass} from "../asset-type-classes/asset.type.class";
import {AssetTypeClasses} from "../asset-type-classes/asset.type.classes";

export class AssetTypeService {
  constructor(private assetTypeRepository: AssetTypeRepository) {
  }

  public getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypes> {
    return this.assetTypeRepository.getAssetTypes(pageNumber, pageSize, sortOrder);
  }

  public getAttributes(assetTypeClassId: string): Observable<Attributes> {
    return this.assetTypeRepository.getAttributes(assetTypeClassId);
  }

  public getValues(assetTypeId: string): Observable<Values> {
    return this.assetTypeRepository.getValues(assetTypeId);
  }

  public getAssetType(assetTypeId: string):Observable<AssetType> {
    return this.assetTypeRepository.getAssetType(assetTypeId);
  }

  public getAssetTypeClass(assetTypeClassId: string):Observable<AssetTypeClass> {
    return this.assetTypeRepository.getAssetTypeClass(assetTypeClassId);
  }

  public findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClasses> {
    return this.assetTypeRepository.findAssetTypeClassId(searchStr, pageSize);
  }

  public addAssetType(assetType: AssetType): Observable<AssetType> {
    return this.assetTypeRepository.addAssetType(assetType);
  }

  public addValue(value: Value): Observable<Value> {
    return this.assetTypeRepository.addValue(value);
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId);
  }

  public deleteValue(valueId: string): Observable<number> {
    return this.assetTypeRepository.deleteValue(valueId);
  }

  public updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType);
  }

  public updateValue(value: Value): Observable<number> {
    return this.assetTypeRepository.updateValue(value);
  }

}
