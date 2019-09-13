// import {Observable, of} from 'rxjs';
// import {AssetType} from './asset.type';
// import {AssetTypes} from './asset.types';
// import {Brand} from '../brands/brand';
// import {Apollo} from 'apollo-angular';
// import gql from 'graphql-tag';
// import {map} from 'rxjs/operators';
// import {AssignedCharacteristic} from '../asset-characteristics/assigned.characteristic';
// import {AssetName} from '../asset-name-types/asset.name';
// import {AssetIdentifier} from '../asset-identifier-types/asset.identifier';
// import {AssetRole} from '../asset-role-types/asset.role';
// import {Instance} from './instance';
// import {UUIDGenerator} from '../uuid.generator';
//
// export class AssetTypeService {
//
//   uuid = new UUIDGenerator();
//   constructor(private apollo: Apollo) {
//   }
//
//   findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
//     return this.apollo.query( {
//       query: gql`
//         query findAssetTypes($searchStr: String!, $pageSize: Int!) {
//           findAssetTypes(searchStr: $searchStr, pageSize: $pageSize) {
//             assetTypeId
//             name
//           }
//         }
//       `,
//       variables: {
//         searchStr,
//         pageSize
//       }
//     }).pipe(map( (res: any) => res.data.findAssetTypes));
//   }
//
//   getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
//     return this.apollo.query( {
//       query: gql`
//         query getAssetTypes($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
//           getAssetTypes(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
//             assetTypes {
//               assetTypeId
//               name
//               description
//             }
//             page {
//               number
//               size
//               items
//               totalItems
//             }
//           }
//         }
//       `,
//       variables: {
//         pageNumber,
//         pageSize,
//         sortOrder
//       }
//     }).pipe(map( (res: any) => res.data.getAssetTypes));
//   }
//
//   getAssetType(assetTypeId: string): Observable<AssetType> {
//     return this.apollo.query( {
//       query: gql`
//         query getAssetType($assetTypeId: ID!) {
//           getAssetType(
//             assetTypeId: $assetTypeId
//           ) {
//             assetTypeId
//             instanceId
//             subTypeOfId
//             subTypeOf {
//               name
//             }
//             initialId
//             name
//             description
//             specification {
//               brandId
//               modelNumber
//               standardPrice
//               effectiveDate
//               totalSalesValue
//               brand {
//                 name
//               }
//             }
//           }
//         }
//       `,
//       variables: {
//         assetTypeId: assetTypeId
//       }
//     }).pipe(map( (res: any) => res.data.getAssetType));
//   }
//
//   addAssetType(assetType: AssetType): Observable<AssetType> {
//     console.log(assetType);
//     return this.apollo.mutate( {
//       mutation: gql`
//         mutation addAssetType(
//           $subTypeOfId: ID!
//           $instanceId: ID!
//           $initialId: ID!
//           $name: String!
//           $description: String,
//           $brandId: ID,
//           $modelNumber: String,
//           $standardPrice: String,
//           $effectiveDate: String,
//           $totalSalesValue: String,
//           $version: String
//         ) {
//           addAssetType(
//             assetType: {
//               subTypeOfId: $subTypeOfId,
//               instanceId: $instanceId,
//               initialId: $initialId,
//               name: $name
//               description: $description,
//               version: $version,
//               specification: {
//                 brandId: $brandId,
//                 modelNumber: $modelNumber,
//                 standardPrice: $standardPrice
//                 effectiveDate: $effectiveDate
//                 totalSalesValue: $totalSalesValue
//               },
//             }
//           ) {
//             assetTypeId
//             name
//           }
//         }
//       `,
//       variables: {
//         subTypeOfId: assetType.subTypeOfId,
//         instanceId: assetType.instanceId,
//         initialId: assetType.initialId,
//         name: assetType.name,
//         description: assetType.description,
//         brandId: assetType.specification.brandId,
//         modelNumber: assetType.specification.modelNumber,
//         standardPrice: assetType.specification.standardPrice,
//         effectiveDate: assetType.specification.effectiveDate,
//         totalSalesValue: assetType.specification.totalSalesValue,
//         version: this.uuid.generateUUID()
//       }
//     }).pipe(map( (res: any) => {
//       return res.data.addAssetType
//     }));
//   }
//
//   updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
//     return this.apollo.mutate( {
//       mutation: gql`
//         mutation updateAssetType(
//           $assetTypeId: ID!,
//           $subTypeOfId: ID!
//           $instanceId: ID!
//           $initialId: ID!
//           $name: String!
//           $description: String,
//           $brandId: ID,
//           $modelNumber: String,
//           $standardPrice: String,
//           $effectiveDate: String,
//           $totalSalesValue: String,
//           $version: String!
//         ) {
//           updateAssetType(
//           assetTypeId: $assetTypeId,
//             assetType: {
//               subTypeOfId: $subTypeOfId,
//               instanceId: $instanceId,
//               initialId: $initialId,
//               name: $name
//               description: $description,
//               version: $version,
//               specification: {
//                 brandId: $brandId,
//                 modelNumber: $modelNumber,
//                 standardPrice: $standardPrice
//                 effectiveDate: $effectiveDate
//                 totalSalesValue: $totalSalesValue
//               },
//             }
//           )
//         }
//       `,
//       variables: {
//         assetTypeId: assetTypeId,
//         subTypeOfId: assetType.subTypeOfId,
//         instanceId: assetType.instanceId,
//         initialId: assetType.initialId,
//         name: assetType.name,
//         description: assetType.description,
//         version: assetType.version,
//         brandId: assetType.specification.brandId,
//         modelNumber: assetType.specification.modelNumber,
//         standardPrice: assetType.specification.standardPrice,
//         effectiveDate: assetType.specification.effectiveDate,
//         totalSalesValue: assetType.specification.totalSalesValue
//       }
//     }).pipe(map( (res: any) => res.data.updateAssetType));
//   }
//
//   deleteAssetType(assetTypeId: string): Observable<number> {
//     return this.apollo.mutate({
//       mutation: gql`
//         mutation deleteAssetType($assetTypeId: ID!) {
//           deleteAssetType(assetTypeId: $assetTypeId)
//         }
//       `,
//       variables: {
//         assetTypeId: assetTypeId,
//       }
//     }).pipe(map( (res: any) => res.data.deleteAssetType));
//   }
//
//   // OTHERS
//
//   getInstances(): Observable<Instance[]> {
//     return of([
//       {
//         instanceId: '7bc3fa8a-84b6-4088-91d4-8a1cc84e7cff',
//         name: 'Other Asset Type'
//       },
//       {
//         instanceId: '8bc5fa8a-84b6-4088-91d4-8a1cc84e7cff',
//         name: 'Asset Specification'
//       },
//     ]);
//   }
//
//   findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
//     return this.apollo.query( {
//       query: gql`
//         query findBrands($searchStr: String!, $pageSize: Int!) {
//           findBrands(searchStr: $searchStr, pageSize: $pageSize) {
//             brandId
//             name
//           }
//         }
//       `,
//       variables: {
//         searchStr,
//         pageSize
//       }
//     }).pipe(map( (res: any) => res.data.findBrands));
//   }
// }
