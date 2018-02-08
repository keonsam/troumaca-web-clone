import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {AssetRepository} from "../../assets/asset.repository";
import {AssetClient} from "../../client/assets/asset.client";
import {Asset} from "../../assets/asset";
import { map, reduce, somethingElse } from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {Assets} from "../../assets/assets";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
//import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
import {AssetKinds} from "assets/asset.kinds";
import {AssetKind} from "../../assets/asset.kind";
import {AssetType} from "../../assets/asset.type";
import {AssetPerson} from "../../assets/asset.person";
import {UnitOfMeasure} from "../../assets/asset.unit.of.measure";
import {Site} from "../../assets/asset.site";
import {AssetState} from "../../client/assets/asset.state";

export class AssetRepositoryAdapter extends AssetRepository {

  constructor(private assetClient: AssetClient) {
    super();
  }

  public getAssetTypes(): Observable<Asset> {
    return null;
  }

  public getAssets(pageNumber:number, pageSize:number, sortOrder:string): Observable<Assets> {
    return this.assetClient
    .getAssets(pageNumber, pageSize, sortOrder)
    .map(values => {
      let assetModels:Assets = new Assets();
      assetModels.assets = map(values.assets, value => {
        let assetModel:Asset = mapObjectProps(value, new Asset());
        //assetModel.assetTypeClass = mapObjectPropAs(value.assetType, new AssetTypeClass());
        assetModel.assetType = mapObjectProps(value.assetType, new AssetType());
        assetModel.unitOfMeasure = mapObjectProps(value.unitOfMeasure, new UnitOfMeasure());
        assetModel.person = mapObjectProps(value.person, new AssetPerson());
        assetModel.site = mapObjectProps(value.site, new Site());
        return assetModel;
      });
     assetModels.page = mapObjectProps(values.page, new Page());
     assetModels.sort = mapObjectProps(values.sort, new Sort());

     console.log(assetModels);
      return assetModels;
    });
  }

  public getAsset(assetId: string): Observable<Asset> {
    return this.assetClient
      .getAssetState(assetId)
      .map(value => {
         return mapObjectProps(value, new Asset());
      });
  }

  public getAssetKinds(): Observable<AssetKinds> {
    return this.assetClient
    .getAssetKinds()
    .map(values => {
      let assetKinds:AssetKinds = new AssetKinds();
      assetKinds.assetKinds = map(values.assetKinds, value => {
        return mapObjectProps(value, new AssetKind());
      });
      return assetKinds;
    });
  }

  public addAsset(asset: Asset): Observable<Asset> {
    return this.assetClient
    .addAsset(mapObjectProps(asset, new AssetState()))
    .map(value => {
      return mapObjectProps(value, new Asset());
    });
  }

  public updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.assetClient.updateAsset(assetId, mapObjectProps(asset, new AssetState()));
  }

  public deleteAsset(assetId: string): Observable<number> {
    return this.assetClient.deleteAsset(assetId);
  }

// public findAssetTypes(searchStr:string): Observable<AssetTypes> {
  //   return this.assetClient
  //   .findAssetTypes(searchStr)
  //   .map(values => {
  //     let assetTypes:AssetTypes = new AssetTypes();
  //     assetTypes.assetTypes = map(values.assetTypes, value => {
  //       return mapObjectProps(value, new AssetType());
  //     });
  //     return assetTypes;
  //   });
  // }

}
