import {AssetTypeClassRepository} from '../../asset-type-classes/asset.type.class.repository';
import {AssetTypeClassClient} from '../../client/asset-type-class/asset.type.class.client';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {AssetTypeClass} from '../../asset-type-classes/asset.type.class';
import {AssetTypeClassState} from '../../client/asset-type-class/asset.type.class.state';
// import { map } from 'underscore';
import {AssetTypeClasses} from '../../asset-type-classes/asset.type.classes';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {Attributes} from '../../attributes/attributes';
import {Attribute} from '../../attributes/attribute';
import {AttributeState} from '../../client/attribute/attribute.state';
import {DataType} from '../../attributes/data.type';
import {AssignedAttribute} from '../../asset-type-classes/assigned.attribute';
import {AssignedAttributeState} from '../../client/asset-type-class/assigned.attribute.state';
import {UnitOfMeasure} from '../../unit-of-measure/unit.of.measure';
import {AssetTypeClassResponse} from '../../asset-type-classes/asset.type.class.response';

export class AssetTypeClassRepositoryAdapter extends AssetTypeClassRepository {

  constructor(private assetTypeClassClient: AssetTypeClassClient) {
    super();
  }

  getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassClient
      .getAvailableAttributes(pageNumber, pageSize, sortOrder, assignedArray)
      .pipe(map(values => {
        const attributes: Attributes = new Attributes();
        attributes.attributes = values.attributes.map( value => mapObjectProps(value, new Attribute()));
        attributes.page = mapObjectProps(values.page, new Page());
        attributes.sort = mapObjectProps(values.sort, new Sort());
        return attributes;
      }));
  }

  public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    return this.assetTypeClassClient.getAssignedAttributes(assetTypeClassId)
      .pipe( map(values => {
        return values.map(x => mapObjectProps(x, new AssignedAttribute()));
      }));
  }

  getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse> {
    return this.assetTypeClassClient.getAssetTypeClass(assetTypeClassId);
  }

  getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClasses> {
    return this.assetTypeClassClient
      .getAssetTypeClasses(pageNumber, pageSize, sortOrder)
      .pipe(map(values => {
        const assetTypeClasses: AssetTypeClasses = new AssetTypeClasses();
        assetTypeClasses.assetTypeClasses = values.assetTypeClasses.map( value => mapObjectProps(value, new AssetTypeClass()));
        assetTypeClasses.page = mapObjectProps(values.page, new Page());
        assetTypeClasses.sort = mapObjectProps(values.sort, new Sort());

        return assetTypeClasses;
      }));
  }

  addAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass> {
    const newAssignedAttributes = assignedAttributes.map( next => mapObjectProps(next, new AssignedAttributeState()));
    return this.assetTypeClassClient
    .addAssetTypeClass(mapObjectProps(assetTypeClass, new AssetTypeClassState()), newAssignedAttributes)
    .pipe(map(value => {
      return mapObjectProps(value, new AssetTypeClass());
    }));
  }

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetTypeClassClient.deleteAssetTypeClass(assetTypeClassId);
  }

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number> {
    const newAssignedAttributes = assignedAttributes.map( next => mapObjectProps(next, new AssignedAttributeState()));
    return this.assetTypeClassClient
      .updateAssetTypeClass(assetTypeClassId, mapObjectProps(assetTypeClass, new AssetTypeClassState()), newAssignedAttributes);
  }
}
