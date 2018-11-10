import {Observable} from 'rxjs';
import {AssetTypeClassResponse} from '../../asset-type-classes/asset.type.class.response';
import {Attributes} from "../../attributes/attributes";
import {AssignedAttribute} from "../../asset-type-classes/assigned.attribute";
import {AssetTypeClasses} from "../../asset-type-classes/asset.type.classes";
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";

export abstract class AssetTypeClassClient {

  abstract getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse>;

  abstract getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClasses>;

  abstract addAssetTypeClass(assetTypeClassState: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass>;

  abstract deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

  abstract updateAssetTypeClass(assetTypeClassId: string, assetTypeClassState: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number>;

  // OTHERS

  abstract getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes>;

  abstract getAssignableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes>;

  // abstract getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]>;
}
