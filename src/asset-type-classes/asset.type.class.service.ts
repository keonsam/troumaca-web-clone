import {AssetTypeClassRepository} from './asset.type.class.repository';
import {Observable} from 'rxjs';
import {AssetTypeClass} from './asset.type.class';
import {AssetTypeClasses} from './asset.type.classes';
import {AssignedAttribute} from './assigned.attribute';
import {Attributes} from "../attributes/attributes";

export class AssetTypeClassService {

  constructor(private assetTypeClassRepository: AssetTypeClassRepository) {
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.getAssetTypeClass(assetTypeClassId);
  }

  public getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClasses> {
    return this.assetTypeClassRepository.getAssetTypeClasses(pageNumber, pageSize, sortOrder);
  }

  public addAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.addAssetTypeClass(assetTypeClass, assignedAttributes);
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId);
  }

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number> {
    return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass, assignedAttributes);
  }

  // OTHERS

  public getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassRepository.getAvailableAttributes(pageNumber, pageSize, sortOrder, assignedArray);
  }

  public getAssignableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassRepository.getAssignableAttributes(pageNumber, pageSize, sortOrder, assignedArray);
  }
}
