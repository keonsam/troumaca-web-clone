import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {AssetRepository} from '../../assets/asset.repository';
import {AssetClient} from '../../client/asset/asset.client';
import {Asset} from '../../assets/asset';
import { map } from 'underscore';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {Assets} from '../../assets/assets';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {AssetKinds} from '../../assets/asset.kinds';
import {AssetKind} from '../../assets/asset.kind';
import {AssetType} from '../../asset-types/asset.type';
import {AssetPerson} from '../../assets/asset.person';
import {UnitOfMeasure} from '../../unit-of-measure/unit.of.measure';
import {Site} from '../../assets/asset.site';
import {UnionOfPhysicalSite} from '../../assets/asset.union.of.physical.site';

import {AssetState} from '../../client/asset/asset.state';

export class AssetRepositoryAdapter extends AssetRepository {

  constructor(private assetClient: AssetClient) {
    super();
  }

  public getAssetTypes(): Observable<Asset> {
    return null;
  }

  public getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets> {
    return this.assetClient
    .getAssets(pageNumber, pageSize, sortOrder)
    .map(values => {
      const assetModels: Assets = new Assets();
      assetModels.assets = map(values.assets, value => mapObjectProps(value, new Asset()));
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
      const assetKinds: AssetKinds = new AssetKinds();
      assetKinds.assetKinds = map(values.assetKinds, value => {
        return mapObjectProps(value, new AssetKind());
      });
      return assetKinds;
    });
  }

  public findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return this.assetClient
    .findAssetTypes(searchStr, pageSize)
    .map(values => {
      return map(values, value => {
        return mapObjectProps(value, new AssetType());
      });
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

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]> {
    return this.assetClient
    .findUnionOfPhysicalSites(searchStr, pageSize)
    .map(values => {
      return map(values, value => {
        return mapObjectProps(value, new UnionOfPhysicalSite());
      });
    });
  }

  public findPersons(searchStr: string, pageSize: number): Observable<AssetPerson[]> {
    return this.assetClient
    .findPersons(searchStr, pageSize)
    .map(values => {
      return map(values, value => {
        return mapObjectProps(value, new AssetPerson());
      })
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

}
