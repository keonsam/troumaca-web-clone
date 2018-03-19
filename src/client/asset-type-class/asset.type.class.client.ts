import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {AssetTypeClassStates} from "./asset.type.class.states";
import {AttributeStates} from "../attribute/attribute.states";
import {AttributeState} from "../attribute/attribute.state";
import {DataTypeStates} from "../attribute/data.type.states";
import {AssignedAttributeState} from "./assigned.attribute.state";

export abstract class AssetTypeClassClient {

  abstract getDataTypes(): Observable<DataTypeStates>;

  abstract getAssetTypeClass(assetTypeClassId: string) : Observable<any>;

  abstract getAttribute(attributeId: string) : Observable<AttributeState>;

  abstract getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string): Observable<AssetTypeClassStates>;

  abstract getAvailableAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates>;

  abstract getAssignAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates>;

  abstract addAssetTypeClass(assetTypeClassState: AssetTypeClassState, assignedAttributes: AssignedAttributeState):Observable<AssetTypeClassState>;

  abstract addAttribute(attributeState: AttributeState):Observable<AttributeState>;

  abstract deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

  abstract deleteAttribute(attributeId: string): Observable<number>;

  abstract updateAssetTypeClass(assetTypeClassId: string, assetTypeClassState: AssetTypeClassState, assignedAttributes: AssignedAttributeState) : Observable<number>;

  abstract updateAttribute(attributeId: string, attributeState: AttributeState) : Observable<number>;
}
