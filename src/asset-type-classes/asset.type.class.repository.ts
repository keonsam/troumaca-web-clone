import {AssetTypeClass} from "./asset.type.class";
import {Observable} from "rxjs/Observable";
import {AssetTypeClasses} from "./asset.type.classes";
import {Attributes} from "../attributes/attributes";
import {Attribute} from "../attributes/attribute";
import {DataTypes} from "../attributes/data.types";
import {AssignedAttribute} from "./assigned.attribute";

export abstract class AssetTypeClassRepository {

  abstract getDataTypes(): Observable<DataTypes>;

  abstract getAssetTypeClass(assetTypeClassId: string): Observable<any>;

  abstract getAttribute(attributeId: string): Observable<Attribute>;

  abstract getAssetTypeClasses(pageNumber:number, pageSize:number, sortOrder:string):Observable<AssetTypeClasses>;

  abstract getAvailableAttributes(pageNumber:number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<Attributes>;

  abstract getAssignAttributes(pageNumber:number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<Attributes>;

  abstract addAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute): Observable<AssetTypeClass>;

  abstract addAttribute(availableAttribute: Attribute): Observable<Attribute>;

  abstract deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

  abstract deleteAttribute(attributeId: string): Observable<number>;

  abstract updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute): Observable<number>;

  abstract updateAttribute(attributeId: string, availableAttribute: Attribute): Observable<number>;
}
