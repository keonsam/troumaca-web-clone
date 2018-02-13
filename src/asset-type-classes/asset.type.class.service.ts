import {AssetTypeClassRepository} from "./asset.type.class.repository";
import {Observable} from "rxjs/Observable";
import {AssetTypeClass} from "./asset.type.class";
import {AssetTypeClasses} from "./asset.type.classes";
import {Attributes} from "../attributes/attributes";
import {Attribute} from "../attributes/attribute";
import {DataTypes} from "../attributes/data.types";

export class AssetTypeClassService {

  constructor(private assetTypeClassRepository: AssetTypeClassRepository) {
  }

  public getDataTypes(): Observable<DataTypes> {
    return this.assetTypeClassRepository.getDataTypes();
  }
  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.getAssetTypeClass(assetTypeClassId);
  }

  public getAvailableAttribute(attributeId: string): Observable<Attribute> {
    return this.assetTypeClassRepository.getAvailableAttribute(attributeId);
  }

  public getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string):Observable<AssetTypeClasses> {
    return this.assetTypeClassRepository.getAssetTypeClasses(pageNumber, pageSize, sortOrder);
  }

  public getAvailableAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassRepository.getAvailableAttributes(pageNumber, pageSize, sortOrder, assignedArray);
  }

  public getAssignedAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassRepository.getAssignedAttributes(pageNumber, pageSize, sortOrder, assignedArray);
  }

  public addAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.addAssetTypeClass(assetTypeClass);
  }

  public addAvailableAttribute(availableAttribute: Attribute): Observable<Attribute> {
    return this.assetTypeClassRepository.addAvailableAttribute(availableAttribute);
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId);
  }

  public deleteAvailableAttribute(attributeId: string): Observable<number> {
    return this.assetTypeClassRepository.deleteAvailableAttribute(attributeId);
  }

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass): Observable<number> {
    return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass);
  }

  public updateAvailableAttribute(attributeId: string, availableAttribute: Attribute): Observable<number> {
    return this.assetTypeClassRepository.updateAvailableAttribute(attributeId, availableAttribute);
  }

}
