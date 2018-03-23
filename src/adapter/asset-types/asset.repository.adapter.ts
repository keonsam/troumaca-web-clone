import "rxjs/add/operator/map";
import {AssetTypeRepository} from "../../asset-types/asset.type.repository";
import {AssetTypesClient} from "../../client/asset-type/asset.types.client";
import {Observable} from "rxjs/Observable";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import { _ } from "underscore";
import { map, reduce, somethingElse } from "underscore";
import {Attribute} from "../../attributes/attribute";
import {Attributes} from "../../attributes/attributes";
import {AssetType} from "../../asset-types/asset.type";
import {AssetTypes} from "../../asset-types/asset.types";
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
import {AssetTypeClasses} from "../../asset-type-classes/asset.type.classes";
import {AssetTypeState} from "../../client/asset-type/asset.type.state";
import {ValueState} from "../../client/asset-type/value.state";
//import {ValueStates} from "../../client/asset-type/value.states";
import {Value} from "../../asset-types/value";
import {Values} from "../../asset-types/values";
import {UnitOfMeasure} from "../../unit-of-measure/unit.of.measure";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";

export class AssetTypeRepositoryAdapter extends AssetTypeRepository {

  constructor(private assetTypesClient: AssetTypesClient) {
    super();
  }

  public getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string): Observable<AssetTypes> {
    return this.assetTypesClient
      .getAssetTypes(pageNumber, pageSize, sortOrder)
      .map(values => {
        let assetTypeModels:AssetTypes = new AssetTypes();
        assetTypeModels.assetTypes = map(values.assetTypes, value => {
          let assetTypeModel:AssetType = mapObjectProps(value, new AssetType());
          //assetTypeModel.assetTypeClass = mapObjectPropAs(value.assetType, new AssetTypeClass());
          assetTypeModel.assetTypeClass = mapObjectProps(value.assetTypeClass, new AssetTypeClass());
          return assetTypeModel;
        });
       assetTypeModels.page = mapObjectProps(values.page, new Page());
       assetTypeModels.sort = mapObjectProps(values.sort, new Sort());
        return assetTypeModels;
      });
  }

  public getAssignedAttributes(assetTypeClassId: string): Observable<any> {
    return this.assetTypesClient
      .getAssignedAttributes(assetTypeClassId)
      .map(values => {
        return values;
      });
  }

  public getValues(assetTypeId: string): Observable<Values> {
    return this.assetTypesClient
      .getValues(assetTypeId)
      .map(values => {
        let valueModels:Values = new Values();
        valueModels.values = map(values.values, value => {
          return mapObjectProps(value, new Value());
        });
        return valueModels;
      });
  }

  public getAssetType(assetTypeId: string): Observable<AssetType> {
    return this.assetTypesClient
    .getAssetTypeState(assetTypeId)
    .map(value => {
       return mapObjectProps(value, new AssetType());
    });
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass> {
    return this.assetTypesClient
    .getAssetTypeClassState(assetTypeClassId)
    .map(value => {
       return mapObjectProps(value, new AssetTypeClass());
    });
  }

  public findAssetTypeClassId(searchStr: string, pageSize:number): Observable<AssetTypeClasses> {
    return this.assetTypesClient
    .findAssetTypeClassId(searchStr, pageSize)
    .map(values => {
      let assetTypeClasses:AssetTypeClasses = new AssetTypeClasses();
      assetTypeClasses.assetTypeClasses = map(values.assetTypeClasses, value => {
        return mapObjectProps(value, new AssetTypeClass());
      });
      return assetTypeClasses;
    });
  }

  public findUnitOfMeasureId(searchStr: string, pageSize:number): Observable<UnitOfMeasure[]> {
    return this.assetTypesClient
      .findUnitOfMeasureIdState(searchStr, pageSize)
      .map(data => {
        return map(data, value => {
          return mapObjectProps(value, new UnitOfMeasure());
        });
      });
  }

  public addAssetType(assetType: AssetType): Observable<AssetType> {
    return this.assetTypesClient
    .addAssetTypeState(mapObjectProps(assetType, new AssetTypeState()))
    .map(value => {
      return mapObjectProps(value, new AssetType());
    });
  }

  public addValue(value: Value[]): Observable<Value[]> {
    return this.assetTypesClient
    .addValueState( map(value, next =>{
      return mapObjectProps(next, new ValueState());
    })
  ).map(values => {
        return map(values, next => {
          return mapObjectProps(values, new Value());
        });
      });
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypesClient.deleteAssetType(assetTypeId);
  }

  public deleteValue(valueId: string): Observable<number> {
    return this.assetTypesClient.deleteValue(valueId);
  }

  public updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return this.assetTypesClient.updateAssetType(assetTypeId,  mapObjectProps(assetType, new AssetTypeState()));
  }

  public updateValue(assetTypeId, value: Value[]): Observable<number> {
    return this.assetTypesClient.updateValue(assetTypeId, map(value , next => { return mapObjectProps(next, new ValueState()) }));
  }

}
