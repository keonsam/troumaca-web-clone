import {AssetTypeClass} from "./asset.type.class";
import {Observable} from "rxjs/Observable";
import {AssetTypeClasses} from "./asset.type.classes";
import {Attributes} from "../attributes/attributes";
import {Attribute} from "../attributes/attribute";
import {DataTypes} from "../attributes/data.types";

export abstract class AssetTypeClassRepository {

  abstract getDataTypes(): Observable<DataTypes>;

  abstract getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass>;

  abstract getAvailableAttribute(attributeId: string): Observable<Attribute>;

  abstract getAssetTypeClasses(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypeClasses>;

  abstract getAvailableAttributes(pageNumber:number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<Attributes>;

  abstract getAssignedAttributes(pageNumber:number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<Attributes>;

  abstract addAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass>;

  abstract addAvailableAttribute(availableAttribute: Attribute): Observable<Attribute>;

  abstract deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

  abstract deleteAvailableAttribute(attributeId: string): Observable<number>;

  abstract updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass): Observable<number>;

  abstract updateAvailableAttribute(attributeId: string, availableAttribute: Attribute): Observable<number>;
}
