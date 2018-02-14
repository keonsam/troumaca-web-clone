import "rxjs/add/operator/map";
import {AssetTypeRepository} from "../../asset-types/asset.type.repository";
import {AssetTypesClient} from "../../client/asset-type/asset.types.client";
import {Observable} from "rxjs/Observable";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import { _ } from "underscore";
import { map, reduce, somethingElse } from "underscore";
import {AssetTypes} from "../../assets/asset.types";
import {AssetType} from "../../assets/asset.type";
import {AssetTypeClasses} from "../../assets/asset.type.classes";
import {AssetTypeState} from "../../client/asset-type/asset.type.state";
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
          assetTypeModel.assetTypeClass = mapObjectProps(value.assetTypeClass, new AssetTypeClasses());
          return assetTypeModel;
        });
       assetTypeModels.page = mapObjectProps(values.page, new Page());
       assetTypeModels.sort = mapObjectProps(values.sort, new Sort());
        return assetTypeModels;
      });
  }

  public getAssetType(assetTypeId: string): Observable<AssetType> {
    return this.assetTypesClient
    .getAssetTypeState(assetTypeId)
    .map(value => {
       return mapObjectProps(value, new AssetType());
    });
  }

  public findAssetTypes(searchStr: string, pageSize:number): Observable<AssetTypes> {
    return this.assetTypesClient
    .findAssetTypes(searchStr, pageSize)
    .map(values => {
      let assetTypes:AssetTypes = new AssetTypes();
      assetTypes.assetTypes = map(values.assetTypes, value => {
        return mapObjectProps(value, new AssetType());
      });
      return assetTypes;
    });
  }

  public addAssetType(assetType: AssetType): Observable<AssetType> {
    return this.assetTypesClient
    .addAssetTypeState(mapObjectProps(assetType, new AssetTypeState()))
    .map(value => {
      return mapObjectProps(value, new AssetType());
    });
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypesClient.deleteAssetType(assetTypeId);
  }

  public updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return this.assetTypesClient.updateAssetType(assetTypeId,  mapObjectProps(assetType, new AssetTypeState()));
  }

}
