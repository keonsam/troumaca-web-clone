import {BehaviorSubject, Observable} from 'rxjs';
import {Assets} from './assets';
import {Asset} from './asset';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {UUIDGenerator} from '../uuid.generator';

export class AssetService {

  listType: BehaviorSubject<string> = new BehaviorSubject( '');
  onNewAsset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onNewAssetType: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  search: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  lastPage: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  uuid = new UUIDGenerator();
  constructor(private apollo: Apollo) {
  }

  getAssets(search?: string, lastPage?: number, pageSize?: number): Observable<Assets> {
    return this.apollo.query({
      query: gql`
        query getAssets($search: String $paging: AssetPagingInput) {
          getAssets(search: $search, paging: $paging) {
            assets {
              assetId
              name
              assetType {
                name
              }
              image
              description
            }
          }
        }
      `,
      variables: {
        search: search,
        paging: {
          pageSize: pageSize,
          pageNumber: lastPage
        }
      }
    }).pipe(map((res: any) => {
      if (res && res.data && res.data.getAssets) {
        return res.data.getAssets;
      } else {
        return res;
      }
    }));
  }

  getAssetById(assetId: string): Observable<Asset> {
    return this.apollo.query({
      query: gql`
        query getAssetById($assetId: ID!) {
          getAssetById(assetId: $assetId) {
            assetId
            assetTypeId
            assetType {
              assetTypeId
              name
              color
            }
            name
            description
            image
          }
        }
      `,
      variables: {
        assetId: assetId
      }
    }).pipe(map((res: any) => res.data.getAssetById));
  }

  addAsset(asset: Asset): Observable<Asset> {
    return this.apollo.mutate({
      mutation: gql`
        mutation addAsset(
          $name: String!,
          $assetTypeId: ID,
          $description: String,
          $image: String
          #        $createdOn: String,
          #        $destroyOn: String,
          #        $serialNumber: String,
          #        $inventoryID: String,
          #        $quantity: String,
          #        $buildingNumber: String,
          #        $lotNumber: String,
          #        $numberOfShares: String,
          #        $version: String!
        ) {
          addAsset(
            data: {
              name: $name,
              assetTypeId: $assetTypeId,
              description: $description,
              image: $image
              #              createdOn: $createdOn,
              #              destroyOn: $destroyOn,
              #              discreteItem: {
              #                serialNumber: $serialNumber
              #              }
              #              inventoryItem: {
              #                inventoryID: $inventoryID
              #                quantity: $quantity
              #              }
              #              building: {
              #                buildingNumber: $buildingNumber
              #              }
              #              lot: {
              #                lotNumber: $lotNumber
              #                numberOfShares: $numberOfShares
              #              }
              #              version: $version
            }
          ) {
            assetId
          }
        }
      `,
      variables: {
        name: asset.name,
        assetTypeId: asset.assetTypeId,
        description: asset.description,
        image: asset.image
        // createdOn: asset.createdOn,
        // destroyOn: asset.destroyOn,
        // serialNumber: asset.discreteItem.serialNumber,
        // inventoryID: asset.inventoryItem.inventoryID,
        // quantity: asset.inventoryItem.quantity,
        // buildingNumber: asset.building.buildingNumber,
        // lotNumber: asset.lot.lotNumber,
        // numberOfShares: asset.lot.numberOfShares,
        // version: this.uuid.generateUUID()
      }
    }).pipe(map((res: any) => {
      if (res && res.data && res.data.addAsset) {
        return res.data.addAsset;
      } else {
        return res
      }
    }));
  }

  updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateAsset(
          $assetId: ID!,
          $name: String!,
          $assetTypeId: ID!,
          $description: String,
          $image: String
        ) {
          updateAsset(
            assetId: $assetId,
            asset: {
              name: $name,
              assetTypeId: $assetTypeId,
              description: $description,
              image: $image
            }
          )
        }
      `,
      variables: {
        assetId: assetId,
        name: asset.name,
        assetTypeId: asset.assetTypeId,
        description: asset.description,
        image: asset.image
      }
    }).pipe(map((res: any) => {
      return res.data.updateAsset;
    }));
  }

  deleteAsset(assetId: string): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteAsset($assetId: ID!) {
          deleteAsset(assetId: $assetId)
        }
      `,
      variables: {
        assetId: assetId,
      }
    }).pipe(map((res: any) => res.data.deleteAsset));
  }

  // others

  findAssetTypes(searchStr: string, pageSize: number): Observable<any[]> {
    return this.apollo.query( {
      query: gql`
        query findAssetTypes($searchStr: String!, $pageSize: Int!) {
          findAssetTypes(searchStr: $searchStr, pageSize: $pageSize) {
            assetTypeId
            initialId
            name
          }
        }
      `,
      variables: {
        searchStr,
        pageSize
      }
    }).pipe(map( (res: any) => res.data.findAssetTypes));
  }

}
