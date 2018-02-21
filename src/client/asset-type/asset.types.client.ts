import {AssetTypeState} from "./asset.type.state";
import {Observable} from "rxjs/Observable";
import {AssetTypeStates} from "./asset.type.states";
import {AttributeStates} from "../attribute/attribute.states";
import {AssetTypeClassState} from "../asset-type-class/asset.type.class.state";
import {AssetTypeClassStates} from "../asset-type-class/asset.type.class.states";
import {ValueState} from "./value.state";
import {ValueStates} from "./value.states";

export abstract class AssetTypesClient {
  abstract getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypeStates>;
  abstract getAttributes(assetTypeClassId: string): Observable<AttributeStates>;
  abstract getValues(assetTypeId: string): Observable<ValueStates>;

  abstract getAssetTypeState(assetTypeId: string): Observable<AssetTypeState>;
  abstract getAssetTypeClassState(assetTypeClassId: string): Observable<AssetTypeClassState>;

  abstract findAssetTypes(searchStr: string, pageSize:number):Observable<AssetTypeStates>;
  abstract findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClassStates>;

  abstract addAssetTypeState(assetTypeState: AssetTypeState): Observable<AssetTypeState>;
  abstract addValueState(value: ValueState): Observable<ValueState>;

  abstract deleteAssetType(assetTypeId: string): Observable<number>;
  abstract deleteValue(valueId: string): Observable<number>;

  abstract updateAssetType(assetTypeId: string, assetTypeState: AssetTypeState): Observable<number>;
  abstract updateValue(valueState: ValueState): Observable<number>;
}
