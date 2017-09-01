import "rxjs/add/operator/map";
import {AssetTypesRepository} from "../../asset-types/asset.types.repository";
import {AssetTypesClient} from "../../client/asset-types/asset.types.client";
import {Observable} from "rxjs/Observable";
import {AssetTypeModel} from "../../asset-types/asset.types.model";
import {mapObjectProps} from "../object.property.mapper";
import {AssetTypeClassModel} from "../../asset-types/asset.type.class.model";
import {AssetTypeAttributeModel} from "../../asset-types/asset.type.attribute.model";
import {AssetTypeAttributeValueModel} from "../../asset-types/asset.type.attribute.value.model";

export class AssetTypesRepositoryAdapter extends AssetTypesRepository {

  constructor(private assetTypesClient: AssetTypesClient) {
    super();
  }


  public getAssetTypes(): Observable<AssetTypeModel[]> {
    return this.assetTypesClient
      .getAssetTypes()
      .map(assetTypeState => {
        return assetTypeState.map(assetTypeState => {

          let assetTypeModel:AssetTypeModel = mapObjectProps(assetTypeState, new AssetTypeModel());

          let assetTypeClass = assetTypeState.assetTypeClass;

          if (assetTypeClass) {
            assetTypeModel.assetTypeClass = mapObjectProps(assetTypeClass, new AssetTypeClassModel());
          }

          let assetTypeAttributes = assetTypeState.assetTypeAttributes;
          if (assetTypeAttributes && assetTypeAttributes.length > 0) {
            assetTypeModel.assetTypeAttributes = assetTypeAttributes.map(assetTypeAttribute => {
              return mapObjectProps(assetTypeAttribute, new AssetTypeAttributeModel());
            })
          }

          let assetTypeAttributeValues = assetTypeState.assetTypeAttributeValues;
          if (assetTypeAttributeValues && assetTypeAttributeValues.length > 0) {
            assetTypeModel.assetTypeAttributeValues = assetTypeAttributeValues.map(assetTypeAttribute => {
              return mapObjectProps(assetTypeAttribute, new AssetTypeAttributeValueModel());
            })
          }

          return assetTypeModel;
        });
      });

  }

}