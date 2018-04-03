import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {AssetRepository} from "../../assets/asset.repository";
import {AssetClient} from "../../client/asset/asset.client";
import {Asset} from "../../assets/asset";
import { map, reduce, somethingElse } from "underscore";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {Assets} from "../../assets/assets";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
//import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
import {AssetKinds} from "../../assets/asset.kinds";
import {AssetKind} from "../../assets/asset.kind";
import {AssetType} from "../../asset-types/asset.type";
import {AssetTypes} from "../../asset-types/asset.types";
import {AssetPerson} from "../../assets/asset.person";
import {AssetPersons} from "../../assets/asset.persons";
import {UnitOfMeasure} from "../../unit-of-measure/unit.of.measure";
import {Site} from "../../assets/asset.site";
import {UnionOfPhysicalSite} from "../../assets/asset.union.of.physical.site";
import {AssetUnionOfPhysicalSites} from "../../assets/asset.union.of.physical.sites";


import {AssetState} from "../../client/asset/asset.state";

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

  public findAssetTypes(searchStr: string, pageSize: number): Observable<AssetTypes> {
    return this.assetClient
    .findAssetTypes(searchStr, pageSize)
    .map(values => {
      let assetTypes:AssetTypes = new AssetTypes();
      assetTypes.assetTypes = map(values.assetTypes, value => {
        return mapObjectProps(value, new AssetType());
      });
      return assetTypes;
    });
  }

  public findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.assetClient
    .findUnitOfMeasures(searchStr, pageSize)
    .map(data => {
      return map(data, value => {
        return mapObjectProps(value, new UnitOfMeasure());
      });
    });
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<AssetUnionOfPhysicalSites> {
    return this.assetClient
    .findUnionOfPhysicalSites(searchStr, pageSize)
    .map(values => {
      let unionOfPhysicalSites: AssetUnionOfPhysicalSites = new AssetUnionOfPhysicalSites();
      unionOfPhysicalSites.unionOfPhysicalSites = map(values.unionOfPhysicalSites, value => {
        return mapObjectProps(value, new UnionOfPhysicalSite());
      })
      return unionOfPhysicalSites;
    });
  }

  public findPersons(searchStr: string, pageSize: number): Observable<AssetPersons> {
    return this.assetClient
    .findPersons(searchStr, pageSize)
    .map(values => {
      let persons: AssetPersons = new AssetPersons();
      persons.persons = map(values.persons, value => {
        return mapObjectProps(value, new AssetPerson());
      });
      return persons;
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
