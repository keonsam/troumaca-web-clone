import {BehaviorSubject, Observable} from 'rxjs';
import {Assets} from './assets';
import {Asset} from './asset';
// import { AssetType} from '../asset-types/asset.type';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {UUIDGenerator} from '../uuid.generator';

export class AssetService {

  listType: BehaviorSubject<string> = new BehaviorSubject( '');
  onNewAsset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  uuid = new UUIDGenerator();
  constructor(private apollo: Apollo) {
  }

  getAssets(search?: string): Observable<Assets> {
    return this.apollo.query({
      query: gql`
        query getAssets($search: String) {
          getAssets(search: $search) {
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
        search: search
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
        query getAsset($assetId: ID!) {
          getAsset(assetId: $assetId) {
            assetId
            assetTypeId
            assetType {
              assetTypeId
              initialId
              name
            }
            name
            description
            createdOn
            destroyOn
            discreteItem {
              serialNumber
            }
            inventoryItem {
              inventoryID
              quantity
            }
            building {
              buildingNumber
            }
            lot {
              lotNumber
              numberOfShares
            }
            version
          }
        }
      `,
      variables: {
        assetId: assetId
      }
    }).pipe(map((res: any) => res.data.getAsset));
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
          $createdOn: String,
          $destroyOn: String,
          $serialNumber: String,
          $inventoryID: String,
          $quantity: String,
          $buildingNumber: String,
          $lotNumber: String,
          $numberOfShares: String,
          $version: String!
        ) {
          updateAsset(
            assetId: $assetId,
            asset: {
              name: $name,
              assetTypeId: $assetTypeId,
              description: $description,
              createdOn: $createdOn,
              destroyOn: $destroyOn,
              discreteItem: {
                serialNumber: $serialNumber
              }
              inventoryItem: {
                inventoryID: $inventoryID
                quantity: $quantity
              }
              building: {
                buildingNumber: $buildingNumber
              }
              lot: {
                lotNumber: $lotNumber
                numberOfShares: $numberOfShares
              }
              version: $version
            }
          )
        }
      `,
      variables: {
        assetId: assetId,
        name: asset.name,
        assetTypeId: asset.assetTypeId,
        description: asset.description,
        createdOn: asset.createdOn,
        destroyOn: asset.destroyOn,
        serialNumber: asset.discreteItem.serialNumber,
        inventoryID: asset.inventoryItem.inventoryID,
        quantity: asset.inventoryItem.quantity,
        buildingNumber: asset.building.buildingNumber,
        lotNumber: asset.lot.lotNumber,
        numberOfShares: asset.lot.numberOfShares,
        version: asset.version
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
