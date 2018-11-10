import {AssetTypeState} from './asset.type.state';
import {Observable} from 'rxjs';
import {AssetTypeStates} from './asset.type.states';
import {ValueState} from './value.state';
import {ValueStates} from './value.states';
import {UnitOfMeasureState} from '../unit-of-measure/unit.of.measure.state';
import {AssetTypeResponse} from '../../asset-types/asset.type.response';
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
import {AssignedAttribute} from "../../asset-type-classes/assigned.attribute";

export abstract class AssetTypesClient {
  abstract getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeStates>;
  abstract getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]>;
  abstract getValues(assetTypeId: string): Observable<ValueStates>;

  abstract getAssetTypeState(assetTypeId: string): Observable<AssetTypeResponse>;
  abstract getAssetTypeClassState(assetTypeClassId: string): Observable<AssetTypeClass>;

  abstract findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClass[]>;
  abstract findUnitOfMeasureIdState(searchStr: string, pageSize: number): Observable<UnitOfMeasureState[]>

  abstract addAssetTypeState(assetTypeState: AssetTypeState, values: ValueState[]): Observable<AssetTypeState>;
  // abstract addValueState(value: ValueState[]): Observable<ValueState[]>;

  abstract deleteAssetType(assetTypeId: string): Observable<number>;
  abstract deleteValue(valueId: string): Observable<number>;

  abstract updateAssetType(assetTypeId: string, assetTypeState: AssetTypeState, values: ValueState[]): Observable<number>;
  // abstract updateValue(assetTypeId, valueState: ValueState[]): Observable<number>;
}
