import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {AssetTypeClassStates} from "./asset.type.class.states";
import {AttributeStates} from "../attribute/attribute.states";
import {AttributeState} from "../attribute/attribute.state";
import {DataTypeStates} from "../attribute/data.type.states";

export abstract class AssetTypeClassClient {

  abstract getDataTypes(): Observable<DataTypeStates>;

  abstract getAssetTypeClass(assetTypeClassId: string) : Observable<AssetTypeClassState>;

  abstract getAvailableAttribute(attributeId: string) : Observable<AttributeState>;

  abstract getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string): Observable<AssetTypeClassStates>;

  abstract getAvailableAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates>;

  abstract getAssignedAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates>;

  abstract addAssetTypeClass(assetTypeClassState: AssetTypeClassState):Observable<AssetTypeClassState>;

  abstract addAvailableAttribute(availableAttributeState: AttributeState):Observable<AttributeState>;

  abstract deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

  abstract deleteAvailableAttribute(attributeId: string): Observable<number>;

  abstract updateAssetTypeClass(assetTypeClassId: string, assetTypeClassState: AssetTypeClassState) : Observable<number>;

  abstract updateAvailableAttribute(attributeId: string, availableAttributeState: AttributeState) : Observable<number>;
}
