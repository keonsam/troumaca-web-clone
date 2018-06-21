import {AssetTypeClassRepository} from './asset.type.class.repository';
import {Observable} from 'rxjs/Observable';
import {AssetTypeClass} from './asset.type.class';
import {AssetTypeClasses} from './asset.type.classes';
import {Attributes} from '../attributes/attributes';
import {Attribute} from '../attributes/attribute';
import {DataTypes} from '../attributes/data.types';
import {AssignedAttribute} from './assigned.attribute';
import {UnitOfMeasure} from '../unit-of-measure/unit.of.measure';
import {AssetTypeClassResponse} from './asset.type.class.response';

export class AssetTypeClassService {

  constructor(private assetTypeClassRepository: AssetTypeClassRepository) {
  }

  public getDataTypes(): Observable<DataTypes> {
    return this.assetTypeClassRepository.getDataTypes();
  }

  public findUnitOfMeasureId(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]>{
    return this.assetTypeClassRepository.findUnitOfMeasureId(searchStr, pageSize);
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse> {
    return this.assetTypeClassRepository.getAssetTypeClass(assetTypeClassId);
  }

  public getAttribute(attributeId: string): Observable<Attribute> {
    return this.assetTypeClassRepository.getAttribute(attributeId);
  }

  public getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClasses> {
    return this.assetTypeClassRepository.getAssetTypeClasses(pageNumber, pageSize, sortOrder);
  }

  public getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassRepository.getAvailableAttributes(pageNumber, pageSize, sortOrder, assignedArray);
  }

  public getAssignAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassRepository.getAssignAttributes(pageNumber, pageSize, sortOrder, assignedArray);
  }

  public addAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.addAssetTypeClass(assetTypeClass, assignedAttributes);
  }

  public addAttribute(attribute: Attribute): Observable<Attribute> {
    return this.assetTypeClassRepository.addAttribute(attribute);
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId);
  }

  public deleteAttribute(attributeId: string): Observable<number> {
    return this.assetTypeClassRepository.deleteAttribute(attributeId);
  }

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number> {
    return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass, assignedAttributes);
  }

  public updateAttribute(attributeId: string, availableAttribute: Attribute): Observable<number> {
    return this.assetTypeClassRepository.updateAttribute(attributeId, availableAttribute);
  }

}
