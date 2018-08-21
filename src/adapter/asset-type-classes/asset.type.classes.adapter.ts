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

  public getDataTypes(): Observable<DataType[]> {
    return this.assetTypeClassClient
    .getDataTypes()
    .pipe(map(values => {
      return  values.map( value => {
        return mapObjectProps(value, new DataType());
      });
    }));
  }

  public findUnitOfMeasureId(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.assetTypeClassClient.findUnitOfMeasureIdState(searchStr, pageSize)
      .pipe(map(data => {
        return data.map( value => {
          return mapObjectProps(value, new UnitOfMeasure());
        });
      }));
  }

  getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse> {
    return this.assetTypeClassClient.getAssetTypeClass(assetTypeClassId);
  }

  getAttribute(attributeId: string): Observable<Attribute> {
    return this.assetTypeClassClient
    .getAttribute(attributeId)
    .pipe(map(value => {
      return mapObjectProps(value, new Attribute());
    }));
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

  getAssignableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[], type: string): Observable<Attributes> {
    return this.assetTypeClassClient
    .getAssignableAttributes(pageNumber, pageSize, sortOrder, assignedArray, type)
    .pipe(map(values => {
      const attributes: Attributes = new Attributes();
     attributes.attributes = values.attributes.map( value => mapObjectProps(value, new Attribute()));
     attributes.page = mapObjectProps(values.page, new Page());
     attributes.sort = mapObjectProps(values.sort, new Sort());
          return attributes;
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

  addAttribute(availableAttribute: Attribute): Observable<Attribute> {
    return this.assetTypeClassClient
    .addAttribute(mapObjectProps(availableAttribute, new AttributeState()))
    .pipe(map(value => {
      return mapObjectProps(value, new Attribute());
    }));
  }

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetTypeClassClient.deleteAssetTypeClass(assetTypeClassId);
  }

  deleteAttribute(attributeId: string): Observable<number> {
    return this.assetTypeClassClient.deleteAttribute(attributeId);
  }

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number> {
    const newAssignedAttributes = assignedAttributes.map( next => mapObjectProps(next, new AssignedAttributeState()));
    return this.assetTypeClassClient
      .updateAssetTypeClass(assetTypeClassId, mapObjectProps(assetTypeClass, new AssetTypeClassState()), newAssignedAttributes);
  }

  updateAttribute(attributeId: string, availableAttribute: Attribute): Observable<number> {
    return this.assetTypeClassClient.updateAttribute(attributeId, mapObjectProps(availableAttribute, new AttributeState()));
  }
}
