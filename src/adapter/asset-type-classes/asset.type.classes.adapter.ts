import "rxjs/add/operator/map";
import {AssetTypeClassRepository} from "../../asset-type-classes/asset.type.class.repository";
import {AssetTypeClassClient} from "../../client/asset-type-class/asset.type.class.client";
import {Observable} from "rxjs/Observable";
// import {AssetTypeModel} from "../../asset-types/asset.types.model";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
// import {AssetTypeClassModel} from "../../asset-types/asset.type.class.model";
// import {AssetTypeAttributeModel} from "../../attributes/asset.type.attribute.model";
// import {AssetTypeAttributeValueModel} from "../../attributes/asset.type.attribute.value.model";
import {AssetTypeClassState} from "../../client/asset-type-class/asset.type.class.state";
import { map, reduce, somethingElse } from "underscore";
import {AssetTypeClasses} from "../../asset-type-classes/asset.type.classes";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
import {Attributes} from "../../attributes/attributes";
import {Attribute} from "../../attributes/attribute";
import {AttributeState} from "../../client/attribute/attribute.state";
import {DataTypes} from "../../attributes/data.types";
import {DataType} from  "../../attributes/data.type";

export class AssetTypeClassRepositoryAdapter extends AssetTypeClassRepository {

  constructor(private assetTypeClassClient: AssetTypeClassClient) {
    super();
  }

  public getDataTypes(): Observable<DataTypes> {
    return this.assetTypeClassClient
    .getDataTypes()
    .map(values => {
      let dataTypes:DataTypes = new DataTypes();
      dataTypes.dataTypes = map(values, value => {
        return mapObjectProps(value, new DataType());
      });
      return dataTypes;
    });
  }

  getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass> {
    return this.assetTypeClassClient
    .getAssetTypeClass(assetTypeClassId)
    .map(value =>{
      return mapObjectProps(value, new AssetTypeClass());
    });
  }

  getAvailableAttribute(attributeId: string): Observable<Attribute> {
    return this.assetTypeClassClient
    .getAvailableAttribute(attributeId)
    .map(value =>{
      return mapObjectProps(value, new Attribute());
    });
  }

  getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string): Observable<AssetTypeClasses> {
    return this.assetTypeClassClient
    .getAssetTypeClasses(pageNumber, pageSize, sortOrder)
    .map(values => {
      let assetTypeClasses:AssetTypeClasses = new AssetTypeClasses();
      assetTypeClasses.assetTypeClasses = map(values.assetTypeClasses, value =>{
        let assetTypeClass = mapObjectProps(value, new AssetTypeClass());
        return assetTypeClass;
      });

     assetTypeClasses.page = mapObjectProps(values.page, new Page());
     assetTypeClasses.sort = mapObjectProps(values.sort, new Sort());
          // if (assetTypeClass) {
          //   assetTypeModel.assetTypeClass = mapObjectProps(assetTypeClass, new AssetTypeClassModel());
          // }

          // let attributes = assetTypeState.attributes;
          // if (attributes && attributes.length > 0) {
          //   assetTypeModel.attributes = attributes.map(assetTypeAttribute => {
          //     return mapObjectProps(assetTypeAttribute, new AssetTypeAttributeModel());
          //   })
          // }

          // let assetTypeAttributeValues = assetTypeState.assetTypeAttributeValues;
          // if (assetTypeAttributeValues && assetTypeAttributeValues.length > 0) {
          //   assetTypeModel.assetTypeAttributeValues = assetTypeAttributeValues.map(assetTypeAttribute => {
          //     return mapObjectProps(assetTypeAttribute, new AssetTypeAttributeValueModel());
          //   })
          // }

          return assetTypeClasses;
        });
      }

  getAvailableAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassClient
    .getAvailableAttributes(pageNumber, pageSize, sortOrder, assignedArray)
    .map(values => {
      let attributes: Attributes = new Attributes();
      attributes.attributes = map(values.attributes, value =>{
        let attribute = mapObjectProps(value, new Attribute());
        return attribute;
      });

     attributes.page = mapObjectProps(values.page, new Page());
     attributes.sort = mapObjectProps(values.sort, new Sort());
          return attributes;
        });
  }

  getAssignedAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<Attributes> {
    return this.assetTypeClassClient
    .getAssignedAttributes(pageNumber, pageSize, sortOrder, assignedArray)
    .map(values => {
      let attributes: Attributes = new Attributes();
      attributes.attributes = map(values.attributes, value =>{
        let attribute = mapObjectProps(value, new Attribute());
        return attribute;
      });

     attributes.page = mapObjectProps(values.page, new Page());
     attributes.sort = mapObjectProps(values.sort, new Sort());
          return attributes;
        });
  }

  addAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass> {
    return this.assetTypeClassClient
    .addAssetTypeClass(mapObjectProps(assetTypeClass, new AssetTypeClassState()))
    .map(value =>{
      return mapObjectProps(value, new AssetTypeClass());
    });
  }

  addAvailableAttribute(availableAttribute: Attribute): Observable<Attribute> {
    return this.assetTypeClassClient
    .addAvailableAttribute(mapObjectProps(availableAttribute, new AttributeState()))
    .map(value =>{
      return mapObjectProps(value, new Attribute());
    });
  }

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetTypeClassClient.deleteAssetTypeClass(assetTypeClassId);
  }

  deleteAvailableAttribute(attributeId: string): Observable<number> {
    return this.assetTypeClassClient.deleteAvailableAttribute(attributeId);
  }

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass): Observable<number> {
    return this.assetTypeClassClient.updateAssetTypeClass(assetTypeClassId,mapObjectProps(assetTypeClass, new AssetTypeClassState()));
  }

  updateAvailableAttribute(attributeId: string, availableAttribute: Attribute): Observable<number> {
    return this.assetTypeClassClient.updateAvailableAttribute(attributeId,mapObjectProps(availableAttribute, new AttributeState()));
  }
}
