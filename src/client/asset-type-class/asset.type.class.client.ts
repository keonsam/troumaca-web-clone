import {Observable} from 'rxjs';
import {AssetTypeClassState} from './asset.type.class.state';
import {AssetTypeClassStates} from './asset.type.class.states';
import {AttributeStates} from '../attribute/attribute.states';
import {AssignedAttributeState} from './assigned.attribute.state';
import {AssetTypeClassResponse} from '../../asset-type-classes/asset.type.class.response';

export abstract class AssetTypeClassClient {

  abstract getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<AttributeStates>;

  abstract getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttributeState[]>;

  abstract getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse>;

  abstract getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClassStates>;

  abstract addAssetTypeClass(assetTypeClassState: AssetTypeClassState, assignedAttributes: AssignedAttributeState[]): Observable<AssetTypeClassState>;

  abstract deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

  abstract updateAssetTypeClass(assetTypeClassId: string, assetTypeClassState: AssetTypeClassState, assignedAttributes: AssignedAttributeState[]): Observable<number>;
}
