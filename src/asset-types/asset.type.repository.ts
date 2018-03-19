import {Observable} from "rxjs/Observable";
import {AssetType} from "./asset.type";
import {AssetTypes} from "./asset.types";
import {Value} from "./value";
import {Values} from "./values";
import {Attributes} from "../attributes/attributes";
import {AssetTypeClass} from "../asset-type-classes/asset.type.class";
import {AssetTypeClasses} from "../asset-type-classes/asset.type.classes";
import {UnitOfMeasure} from "../unit-of-measure/unit.of.measure";

export abstract class AssetTypeRepository {
  abstract getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypes>;
  abstract getAssignedAttributes(assetTypeClassId: string): Observable<any>;
  abstract getValues(assetTypeId: string): Observable<Values>;

  abstract getAssetType(assetTypeId: string): Observable<AssetType>;
  abstract getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass>;

  abstract findAssetTypes(searchStr: string, pageSize:number):Observable<AssetTypes>;
  abstract findAssetTypeClassId(searchStr: string, pageSize:number):Observable<AssetTypeClasses>;
  abstract findUnitOfMeasureId(searchStr: string, pageSize:number):Observable<UnitOfMeasure[]>;

  abstract addAssetType(assetType: AssetType): Observable<AssetType>;
  abstract addValue(value: Value): Observable<Value>;

  abstract deleteAssetType(assetTypeId: string): Observable<number>;
  abstract deleteValue(valueId:string): Observable<number>;

  abstract updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number>;
  abstract updateValue(value: Value): Observable<number>;
}
