import "rxjs/add/operator/map";
import {AssetTypesRepository} from "../../asset-types/asset.types.repository";
import {AssetTypesClient} from "../../client/asset-types/asset.types.client";
import {Observable} from "rxjs/Observable";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import { map, reduce, somethingElse } from "underscore";
import {AssetTypes} from "../../assets/asset.types";
import {AssetType} from "../../assets/asset.type";

export class AssetTypesRepositoryAdapter extends AssetTypesRepository {

  constructor(private assetTypesClient: AssetTypesClient) {
    super();
  }

  public getAssetTypes(): Observable<AssetType[]> {
    return this.assetTypesClient
      .getAssetTypes()
      .map(assetTypeState => {
        return assetTypeState.map(assetTypeState => {

          let assetType:AssetType = mapObjectProps(assetTypeState, new AssetType());

          let assetTypeClass = assetTypeState.assetTypeClass;

          // if (assetTypeClass) {
          //   assetTypeModel.assetTypeClass = mapObjectProps(assetTypeClass, new AssetTypeClassModel());
          // }

          // let assetTypeAttributes = assetTypeState.attributes;
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

          return assetType;
        });
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

}