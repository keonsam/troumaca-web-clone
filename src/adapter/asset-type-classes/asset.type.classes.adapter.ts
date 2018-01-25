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
import {AssetTypeClassState} from "../../client/asset-type-classes/asset.type.class.state";
import { map, reduce, somethingElse } from "underscore";
import {AssetTypeClasses} from "../../asset-type-classes/asset.type.classes";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";

export class AssetTypeClassRepositoryAdapter extends AssetTypeClassRepository {

  constructor(private assetTypeClassClient: AssetTypeClassClient) {
    super();
  }


  getAssetTypeClasses(pageNumber?: number): Observable<AssetTypeClasses> {
    return this.assetTypeClassClient
    .getAssetTypeClasses(pageNumber)
    .map(values => {
      let assetTypeClassModels:AssetTypeClasses = new AssetTypeClasses();
      assetTypeClassModels.assetTypeClasses = map(values.assetTypeClasses);
     assetTypeClassModels.page = mapObjectProps(values.page, new Page());
     assetTypeClassModels.sort = mapObjectProps(values.sort, new Sort());
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

          return assetTypeClassModels;
        });
      }

  addAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass> {
    return this.assetTypeClassClient
    .addAssetTypeClass(mapObjectProps(assetTypeClass, new AssetTypeClassState()))
    .map(value =>{
      return mapObjectProps(value, new AssetTypeClass());
    });
  }
}
