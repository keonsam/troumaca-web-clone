import {AssetTypeClass} from './asset.type.class';
import {Observable} from 'rxjs';
import {AssetTypeClasses} from './asset.type.classes';
import {Attributes} from '../attributes/attributes';
import {AssignedAttribute} from './assigned.attribute';

export abstract class AssetTypeClassRepository {


  abstract getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass>;

  abstract getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClasses>;

  abstract addAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass>;

  abstract deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

  abstract updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number>;

  // OTHERS

  abstract getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes>;

  abstract getAssignableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes>;

}
