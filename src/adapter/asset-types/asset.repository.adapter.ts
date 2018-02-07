import "rxjs/add/operator/map";
import {AssetTypeRepository} from "../../asset-types/asset.type.repository";
import {AssetTypesClient} from "../../client/asset-type/asset.types.client";
import {Observable} from "rxjs/Observable";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import { _ } from "underscore";
import { map, reduce, somethingElse } from "underscore";
import {AssetTypes} from "../../assets/asset.types";
import {AssetType} from "../../assets/asset.type";

export class AssetTypeRepositoryAdapter extends AssetTypeRepository {

  constructor(private assetTypesClient: AssetTypesClient) {
    super();
  }

  public getAssetTypes(): Observable<AssetType[]> {
    return this.assetTypesClient
      .getAssetTypes()
      .map(assetTypeStates => {

        // return assetTypeStates.map(assetTypeState => {
        //
        //   let assetType:AssetType = mapObjectProps(assetTypeState, new AssetType());
        //
        //   let assetTypeClass = assetTypeState.assetTypeClass;
        //
        //   return assetType;
        // });

        var assetType:AssetType[] = [];
        return assetType;
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