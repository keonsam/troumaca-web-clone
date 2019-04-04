import {Observable} from 'rxjs';
import {AssetType} from './asset.type';
import {AssetTypes} from './asset.types';
import {Instance} from './instance';
import {Brand} from '../brands/brand';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {AssignedCharacteristic} from '../asset-characteristics/assigned.characteristic';
import {AssetName} from '../asset-name-types/asset.name';
import {AssetIdentifier} from '../asset-identifier-types/asset.identifier';
import {AssetRole} from '../asset-role-types/asset.role';

export class AssetTypeService {
  constructor(private apollo: Apollo) {
  }

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return this.apollo.query( {
      query: gql`
        query findAssetTypes($searchStr: String!, $pageSize: Int!) {
          findAssetTypes(searchStr: $searchStr, pageSize: $pageSize) {
            assetTypeId
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

  getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
    return this.apollo.query( {
      query: gql`
        query getAssetTypes($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
          getAssetTypes(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
            assetTypes {
              assetTypeId
              name
              description
            }
            page {
              number
              size
              items
              totalItems
            }
          }
        }
      `,
      variables: {
        pageNumber,
        pageSize,
        sortOrder
      }
    }).pipe(map( (res: any) => res.data.getAssetTypes));
  }

  getAssetType(assetTypeId: string): Observable<AssetType> {
    return this.apollo.query( {
      query: gql`
        query getAssetType($assetTypeId: ID!) {
          getAssetType(assetTypeId: $assetTypeId) {
            assetTypeId
            instanceId
            parentId
            name
            description
            specification {
              brandId
              modelNumber
              standardPrice
              effectiveDate
              totalSalesValue
              brand {
                name
              }
            }
            assignedCharacteristics {
              assetCharacteristicId
              assetCharacteristic {
                assetCharacteristicId
                name
              }
              value
            }
            assetNames {
              assetNameTypeId
              assetNameType {
                assetNameTypeId
                name
              }
              value
            }
            identifiers {
              assetIdentifierTypeId
              assetIdentifierType {
                assetIdentifierTypeId
                name
              }
              value
            }
            roles {
              assetRoleTypeId
              assetRoleType {
                assetRoleTypeId
                name
              }
              value
            }
          }
        }
      `,
      variables: {
        assetTypeId: assetTypeId
      }
    }).pipe(map( (res: any) => res.data.getAssetType));
  }

  addAssetType(assetType: AssetType): Observable<AssetType> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation addAssetType(
        $instanceId: ID!,
        $parentId: ID!,
        $name: String!,
        $description: String!,
        $brandId: ID,
        $modelNumber: String,
        $standardPrice: String,
        $effectiveDate: String,
        $totalSalesValue: String,
        $assignedCharacteristics: [AssignedCharacteristicInput],
        $assetNames: [AssetNameInput]
        $identifiers: [AssetIdentifierInput]
        $roles: [AssetRoleInput]
        ) {
          addAssetType(
            assetType: {
              instanceId: $instanceId,
              parentId: $parentId,
              name: $name,
              description: $description,
              specification: {
                brandId: $brandId,
                modelNumber: $modelNumber,
                standardPrice: $standardPrice
                effectiveDate: $effectiveDate
                totalSalesValue: $totalSalesValue
              },
              assignedCharacteristics: $assignedCharacteristics,
              assetNames: $assetNames
              identifiers: $identifiers
              roles: $roles
            }
          )
        }
        type AssignedCharacteristicInput {
          assetCharacteristicId: ID
          value: String
        }
        type AssignedCharacteristicInput {
          assetCharacteristicId: ID
          value: String
        }
        type AssetNameInput {
          assetNameTypeId: ID
          value: String
        }
        type AssetIdentifierInput {
          assetIdentifierTypeId: ID
          value: String
        }
        type AssetRoleInput {
          assetRoleTypeId: ID
          value: String
        }
      `,
      variables: {
        name: assetType.name,
        description: assetType.description || '',
        $instanceId: assetType.instanceId,
        $parentId: assetType.parentId,
        $brandId: assetType.specification.brandId,
        $modelNumber: assetType.specification.modelNumber,
        $standardPrice: assetType.specification.standardPrice,
        $effectiveDate: assetType.specification.effectiveDate,
        $totalSalesValue: assetType.specification.totalSalesValue,
        $assignedCharacteristics: assetType.assignedCharacteristics.map(x => {
            return new AssignedCharacteristic(x.assetCharacteristicId, x.value);
          }
        ),
        $assetNames: assetType.assetNames.map(x => {
            return new AssetName(x.assetNameTypeId, x.value);
          }
        ),
        $identifiers: assetType.identifiers.map(x => {
            return new AssetIdentifier(x.assetIdentifierTypeId, x.value);
          }
        ),
        $roles: assetType.roles.map(x => {
            return new AssetRole(x.assetRoleTypeId, x.value);
          }
        ),
      }
    }).pipe(map( (res: any) => res.data.addAssetType));
  }

  updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation updateAssetType(
        $assetTypeId: ID!,
        $instanceId: ID!,
        $parentId: ID!,
        $name: String!,
        $description: String!,
        $brandId: ID,
        $modelNumber: String,
        $standardPrice: String,
        $effectiveDate: String,
        $totalSalesValue: String,
        $assignedCharacteristics: [AssignedCharacteristicInput],
        $assetNames: [AssetNameInput]
        $identifiers: [AssetIdentifierInput]
        $roles: [AssetRoleInput]
        ) {
          updateAssetType(
          assetTypeId: $assetTypeId,
            assetType: {
              instanceId: $instanceId,
              parentId: $parentId,
              name: $name,
              description: $description,
              specification: {
                brandId: $brandId,
                modelNumber: $modelNumber,
                standardPrice: $standardPrice
                effectiveDate: $effectiveDate
                totalSalesValue: $totalSalesValue
              },
              assignedCharacteristics: $assignedCharacteristics,
              assetNames: $assetNames
              identifiers: $identifiers
              roles: $roles
            }
          )
        }
        type AssignedCharacteristicInput {
          assetCharacteristicId: ID
          value: String
        }
        type AssignedCharacteristicInput {
          assetCharacteristicId: ID
          value: String
        }
        type AssetNameInput {
          assetNameTypeId: ID
          value: String
        }
        type AssetIdentifierInput {
          assetIdentifierTypeId: ID
          value: String
        }
        type AssetRoleInput {
          assetRoleTypeId: ID
          value: String
        }
      `,
      variables: {
        assetTypeId: assetTypeId,
        name: assetType.name,
        description: assetType.description || '',
        $instanceId: assetType.instanceId,
        $parentId: assetType.parentId,
        $brandId: assetType.specification.brandId,
        $modelNumber: assetType.specification.modelNumber,
        $standardPrice: assetType.specification.standardPrice,
        $effectiveDate: assetType.specification.effectiveDate,
        $totalSalesValue: assetType.specification.totalSalesValue,
        $assignedCharacteristics: assetType.assignedCharacteristics.map(x => {
            return new AssignedCharacteristic(x.assetCharacteristicId, x.value);
          }
        ),
        $assetNames: assetType.assetNames.map(x => {
            return new AssetName(x.assetNameTypeId, x.value);
          }
        ),
        $identifiers: assetType.identifiers.map(x => {
            return new AssetIdentifier(x.assetIdentifierTypeId, x.value);
          }
        ),
        $roles: assetType.roles.map(x => {
            return new AssetRole(x.assetRoleTypeId, x.value);
          }
        ),
      }
    }).pipe(map( (res: any) => res.data.updateAssetType));
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteAssetType($assetTypeId: ID!) {
          deleteAssetType(assetTypeId: $assetTypeId)
        }
      `,
      variables: {
        assetTypeId: assetTypeId,
      }
    }).pipe(map( (res: any) => res.data.deleteAssetType));
  }

  // OTHERS

  findInstances(searchStr: string, pageSize: number): Observable<Instance[]> {
    return undefined;
    // return this.assetTypeRepository.findInstances(searchStr, pageSize);
  }

  findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
    return this.apollo.query( {
      query: gql`
        query findBrands($searchStr: String!, $pageSize: Int!) {
          findBrands(searchStr: $searchStr, pageSize: $pageSize) {
            brandId
            name
          }
        }
      `,
      variables: {
        searchStr,
        pageSize
      }
    }).pipe(map( (res: any) => res.data.findBrands));
  }
}
