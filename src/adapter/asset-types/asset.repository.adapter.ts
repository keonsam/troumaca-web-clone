import 'rxjs/add/operator/map';
import {AssetTypeRepository} from '../../asset-types/asset.type.repository';
import {AssetTypesClient} from '../../client/asset-type/asset.types.client';
import {Observable} from 'rxjs/Observable';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import { map } from 'underscore';
import {AssetType} from '../../asset-types/asset.type';
import {AssetTypes} from '../../asset-types/asset.types';
import {AssetTypeClass} from '../../asset-type-classes/asset.type.class';
import {AssetTypeState} from '../../client/asset-type/asset.type.state';
import {ValueState} from '../../client/asset-type/value.state';
import {Value} from '../../asset-types/value';
import {Values} from '../../asset-types/values';
import {UnitOfMeasure} from '../../unit-of-measure/unit.of.measure';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {AssignedAttribute} from '../../asset-type-classes/assigned.attribute';
import {AssetTypeResponse} from '../../asset-types/asset.type.response';

export class AssetTypeRepositoryAdapter extends AssetTypeRepository {

  constructor(private assetTypesClient: AssetTypesClient) {
    super();
  }

  public getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
    return this.assetTypesClient
      .getAssetTypes(pageNumber, pageSize, sortOrder)
      .map(values => {
        const assetTypeModels: AssetTypes = new AssetTypes();
        assetTypeModels.assetTypes = map(values.assetTypes, value => mapObjectProps(value, new AssetType()));
       assetTypeModels.page = mapObjectProps(values.page, new Page());
       assetTypeModels.sort = mapObjectProps(values.sort, new Sort());
        return assetTypeModels;
      });
  }

  public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    return this.assetTypesClient
      .getAssignedAttributes(assetTypeClassId)
      .map(assignedAttributes => {
        return map(assignedAttributes, value => {
         return mapObjectProps(value, new AssignedAttribute());
        });
      });
  }

  public getValues(assetTypeId: string): Observable<Values> {
    return this.assetTypesClient
      .getValues(assetTypeId)
      .map(values => {
        const valueModels: Values = new Values();
        valueModels.values = map(values.values, value => {
          return mapObjectProps(value, new Value());
        });
        return valueModels;
      });
  }

  public getAssetType(assetTypeId: string): Observable<AssetTypeResponse> {
    return this.assetTypesClient.getAssetTypeState(assetTypeId);
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass> {
    return this.assetTypesClient
    .getAssetTypeClassState(assetTypeClassId)
    .map(value => {
       return mapObjectProps(value, new AssetTypeClass());
    });
  }

  public findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
    return this.assetTypesClient
    .findAssetTypeClassId(searchStr, pageSize)
    .map(values => {
      return map(values, value => {
        return mapObjectProps(value, new AssetTypeClass());
      });
    });
  }

  public findUnitOfMeasureId(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.assetTypesClient
      .findUnitOfMeasureIdState(searchStr, pageSize)
      .map(data => {
        return map(data, value => {
          return mapObjectProps(value, new UnitOfMeasure());
        });
      });
  }

  public addAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
    return this.assetTypesClient
    .addAssetTypeState(mapObjectProps(assetType, new AssetTypeState()), map(values, value => {
      return mapObjectProps(value, new ValueState());
    }))
    .map(value => {
      return mapObjectProps(value, new AssetType());
    });
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypesClient.deleteAssetType(assetTypeId);
  }

  public deleteValue(valueId: string): Observable<number> {
    return this.assetTypesClient.deleteValue(valueId);
  }

  public updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
    return this.assetTypesClient.updateAssetType(assetTypeId,  mapObjectProps(assetType, new AssetTypeState()), map(values, value => {
      return mapObjectProps(value, new ValueState());
    }));
  }

}
