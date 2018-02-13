import {AssetTypeClassClient} from "./asset.type.class.client";
import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {AssetTypeClassStates} from "./asset.type.class.states";
import {AttributeStates} from "../attribute/attribute.states";
import {AttributeState} from "../attribute/attribute.state";
import {DataTypeStates} from "../attribute/data.type.states";

export class AssetTypeClassClientMock extends AssetTypeClassClient {

  public getDataTypes(): Observable<DataTypeStates> {
    return null;
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassState> {
   return null;
  }

  public getAvailableAttribute(attributeId: string): Observable<AttributeState> {
   return null;
  }

  public getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string): Observable<AssetTypeClassStates> {
    return undefined;
  }

  public getAvailableAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates> {
    return undefined;
  }

  public getAssignedAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates> {
    return undefined;
  }

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState): Observable<AssetTypeClassState> {
    return null;
  }

  public addAvailableAttribute(availableAttributeState: AttributeState): Observable<AttributeState> {
    return null;
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return undefined;
  }

  public deleteAvailableAttribute(attributeId: string): Observable<number> {
    return undefined;
  }

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClassState): Observable<number> {
    return null;
  }

  public updateAvailableAttribute(attributeId: string, availableAttributeState: AttributeState): Observable<number> {
    return null;
  }

}
