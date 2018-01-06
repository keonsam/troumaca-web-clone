import "rxjs/add/operator/map";
import {AssetTypeClassRepository} from "../../asset-type-classes/asset.type.class.repository";
import {AssetTypeClassClient} from "../../client/asset-type-classes/asset.type.class.client";
import {Observable} from "rxjs/Observable";
// import {AssetTypeModel} from "../../asset-types/asset.types.model";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
// import {AssetTypeClassModel} from "../../asset-types/asset.type.class.model";
// import {AssetTypeAttributeModel} from "../../attributes/asset.type.attribute.model";
// import {AssetTypeAttributeValueModel} from "../../attributes/asset.type.attribute.value.model";

export class AssetTypeClassRepositoryAdapter extends AssetTypeClassRepository {

  constructor(private assetTypeClassClient: AssetTypeClassClient) {
    super();
  }


  getAssetTypeClasses(): Observable<AssetTypeClass[]> {
    return this.assetTypeClassClient
      .getAssetTypeClasses()
      .map(assetTypeClasses => {
        return assetTypeClasses.map(assetTypeClass => {

          let assetTypeClazz:AssetTypeClass = mapObjectProps(assetTypeClass, new AssetTypeClass());

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

          return assetTypeClazz;
        });
      });
  }

}