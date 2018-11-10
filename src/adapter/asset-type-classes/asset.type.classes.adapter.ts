import {AssetTypeClassRepository} from '../../asset-type-classes/asset.type.class.repository';
import {AssetTypeClassClient} from '../../client/asset-type-class/asset.type.class.client';
import {Observable} from 'rxjs';
import {AssetTypeClass} from '../../asset-type-classes/asset.type.class';
import {AssetTypeClasses} from '../../asset-type-classes/asset.type.classes';

import {Attributes} from '../../attributes/attributes';
import {AssignedAttribute} from '../../asset-type-classes/assigned.attribute';
import {AssetTypeClassResponse} from '../../asset-type-classes/asset.type.class.response';

export class AssetTypeClassRepositoryAdapter extends AssetTypeClassRepository {

  constructor(private assetTypeClassClient: AssetTypeClassClient) {
    super();
  }

  getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse> {
    return this.assetTypeClassClient.getAssetTypeClass(assetTypeClassId);
  }

  getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClasses> {
    return this.assetTypeClassClient.getAssetTypeClasses(pageNumber, pageSize, sortOrder);
  }

  addAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass> {
    return this.assetTypeClassClient.addAssetTypeClass(assetTypeClass, assignedAttributes);
  }

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetTypeClassClient.deleteAssetTypeClass(assetTypeClassId);
  }

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number> {
    return this.assetTypeClassClient.updateAssetTypeClass(assetTypeClassId, assetTypeClass, assignedAttributes);
  }

  // OTHERS

  getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassClient.getAvailableAttributes(pageNumber, pageSize, sortOrder, assignedArray);
  }

  getAssignableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassClient.getAssignableAttributes(pageNumber, pageSize, sortOrder, assignedArray);
  }

  // public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]> {
  //   return this.assetTypeClassClient.getAssignedAttributes(assetTypeClassId);
  // }
}
