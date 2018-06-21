import 'rxjs/add/operator/map';
import {AssetTypeClassRepository} from '../../asset-type-classes/asset.type.class.repository';
import {AssetTypeClassClient} from '../../client/asset-type-class/asset.type.class.client';
import {Observable} from 'rxjs/Observable';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {AssetTypeClass} from '../../asset-type-classes/asset.type.class';
import {AssetTypeClassState} from '../../client/asset-type-class/asset.type.class.state';
import { map, reduce, somethingElse } from 'underscore';
import {AssetTypeClasses} from '../../asset-type-classes/asset.type.classes';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {Attributes} from '../../attributes/attributes';
import {Attribute} from '../../attributes/attribute';
import {AttributeState} from '../../client/attribute/attribute.state';
import {DataTypes} from '../../attributes/data.types';
import {DataType} from '../../attributes/data.type';
import {AssignedAttribute} from '../../asset-type-classes/assigned.attribute';
import {AssignedAttributeState} from '../../client/asset-type-class/assigned.attribute.state';
import {UnitOfMeasure} from '../../unit-of-measure/unit.of.measure';
import {AssetTypeClassResponse} from '../../asset-type-classes/asset.type.class.response';

export class AssetTypeClassRepositoryAdapter extends AssetTypeClassRepository {

  constructor(private assetTypeClassClient: AssetTypeClassClient) {
    super();
  }

  public getDataTypes(): Observable<DataTypes> {
    return this.assetTypeClassClient
    .getDataTypes()
    .map(values => {
      const dataTypes: DataTypes = new DataTypes();
      dataTypes.dataTypes = map(values, value => {
        return mapObjectProps(value, new DataType());
      });
      return dataTypes;
    });
  }

  public findUnitOfMeasureId(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.assetTypeClassClient.findUnitOfMeasureIdState(searchStr, pageSize)
      .map(data => {
        return map(data, value => {
          return mapObjectProps(value, new UnitOfMeasure());
        });
      });
  }

  getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse> {
    return this.assetTypeClassClient.getAssetTypeClass(assetTypeClassId);
  }

  getAttribute(attributeId: string): Observable<Attribute> {
    return this.assetTypeClassClient
    .getAttribute(attributeId)
    .map(value => {
      return mapObjectProps(value, new Attribute());
    });
  }

  getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClasses> {
    return this.assetTypeClassClient
    .getAssetTypeClasses(pageNumber, pageSize, sortOrder)
    .map(values => {
      const assetTypeClasses: AssetTypeClasses = new AssetTypeClasses();
      assetTypeClasses.assetTypeClasses = map(values.assetTypeClasses, value => {
        const assetTypeClass = mapObjectProps(value, new AssetTypeClass());
        return assetTypeClass;
      });

     assetTypeClasses.page = mapObjectProps(values.page, new Page());
     assetTypeClasses.sort = mapObjectProps(values.sort, new Sort());

          return assetTypeClasses;
        });
      }

  getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassClient
    .getAvailableAttributes(pageNumber, pageSize, sortOrder, assignedArray)
    .map(values => {
      const attributes: Attributes = new Attributes();
      attributes.attributes = map(values.attributes, value => {
        const attribute = mapObjectProps(value, new Attribute());
        return attribute;
      });

     attributes.page = mapObjectProps(values.page, new Page());
     attributes.sort = mapObjectProps(values.sort, new Sort());
          return attributes;
        });
  }

  getAssignAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassClient
    .getAssignAttributes(pageNumber, pageSize, sortOrder, assignedArray)
    .map(values => {
      const attributes: Attributes = new Attributes();
      attributes.attributes = map(values.attributes, value => {
        const attribute = mapObjectProps(value, new Attribute());
        return attribute;
      });

     attributes.page = mapObjectProps(values.page, new Page());
     attributes.sort = mapObjectProps(values.sort, new Sort());
          return attributes;
        });
  }

  addAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass> {
    const newAssignedAttributes = map(assignedAttributes, next => {
      return  mapObjectProps(next, new AssignedAttributeState());
    });
    return this.assetTypeClassClient
    .addAssetTypeClass(mapObjectProps(assetTypeClass, new AssetTypeClassState()), newAssignedAttributes)
    .map(value => {
      return mapObjectProps(value, new AssetTypeClass());
    });
  }

  addAttribute(availableAttribute: Attribute): Observable<Attribute> {
    return this.assetTypeClassClient
    .addAttribute(mapObjectProps(availableAttribute, new AttributeState()))
    .map(value => {
      return mapObjectProps(value, new Attribute());
    });
  }

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetTypeClassClient.deleteAssetTypeClass(assetTypeClassId);
  }

  deleteAttribute(attributeId: string): Observable<number> {
    return this.assetTypeClassClient.deleteAttribute(attributeId);
  }

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number> {
    const newAssignedAttributes = map(assignedAttributes, next => {
      return  mapObjectProps(next, new AssignedAttributeState());
    });
    return this.assetTypeClassClient.updateAssetTypeClass(assetTypeClassId, mapObjectProps(assetTypeClass, new AssetTypeClassState()), newAssignedAttributes);
  }

  updateAttribute(attributeId: string, availableAttribute: Attribute): Observable<number> {
    return this.assetTypeClassClient.updateAttribute(attributeId, mapObjectProps(availableAttribute, new AttributeState()));
  }
}
