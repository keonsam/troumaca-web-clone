import {AssetTypeState} from "./asset.type.state";
import {Observable} from "rxjs/Observable";
import {AssetTypeStates} from "./asset.type.states";
import {AssetTypeClassState} from "../asset-type-class/asset.type.class.state";
import {AssetTypeClassStates} from "../asset-type-class/asset.type.class.states";
import {ValueState} from "./value.state";
import {ValueStates} from "./value.states";
import {UnitOfMeasureState} from "../unit-of-measure/unit.of.measure.state";
import {AssignedAttributeState} from "../asset-type-class/assigned.attribute.state";

export abstract class AssetTypesClient {
  abstract getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypeStates>;
  abstract getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttributeState[]>;
  abstract getValues(assetTypeId: string): Observable<ValueStates>;

  abstract getAssetTypeState(assetTypeId: string): Observable<AssetTypeState>;
  abstract getAssetTypeClassState(assetTypeClassId: string): Observable<AssetTypeClassState>;

  abstract findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClassStates>;
  abstract findUnitOfMeasureIdState(searchStr: string, pageSize:number): Observable<UnitOfMeasureState[]>

  abstract addAssetTypeState(assetTypeState: AssetTypeState): Observable<AssetTypeState>;
  abstract addValueState(value: ValueState[]): Observable<ValueState[]>;

  abstract deleteAssetType(assetTypeId: string): Observable<number>;
  abstract deleteValue(valueId: string): Observable<number>;

  abstract updateAssetType(assetTypeId: string, assetTypeState: AssetTypeState): Observable<number>;
  abstract updateValue(assetTypeId, valueState: ValueState[]): Observable<number>;
}
