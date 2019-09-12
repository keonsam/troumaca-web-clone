// import {AssetRoleType} from './asset.role.type';
// import {Observable} from 'rxjs';
// import {AssetRoleTypes} from './asset.role.types';
// import gql from 'graphql-tag';
// import {map} from 'rxjs/operators';
// import {Apollo} from 'apollo-angular';
// import {UUIDGenerator} from '../uuid.generator';
//
// export class AssetRoleTypeService {
//
//   uuid = new UUIDGenerator();
//
//   constructor(private apollo: Apollo) {}
//
//   findAssetRoleTypes(searchStr: string, pageSize: number): Observable<AssetRoleType[]> {
//     return this.apollo.query( {
//       query: gql`
//         query findAssetRoleTypes($searchStr: String!, $pageSize: Int!) {
//           findAssetRoleTypes(searchStr: $searchStr, pageSize: $pageSize) {
//             assetRoleTypeId
//             name
//           }
//         }
//       `,
//       variables: {
//         searchStr,
//         pageSize
//       }
//     }).pipe(map( (res: any) => res.data.findAssetRoleTypes));
//   }
//
//   getAssetRoleTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetRoleTypes> {
//     return this.apollo.query( {
//       query: gql`
//         query getAssetRoleTypes($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
//           getAssetRoleTypes(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
//             assetRoleTypes {
//               assetRoleTypeId
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
//     }).pipe(map( (res: any) => res.data.getAssetRoleTypes));
//   }
//
//   getAssetRoleType(assetRoleTypeId: string): Observable<AssetRoleType> {
//     return this.apollo.query( {
//       query: gql`
//         query getAssetRoleType($assetRoleTypeId: ID!) {
//           getAssetRoleType(assetRoleTypeId: $assetRoleTypeId) {
//             assetRoleTypeId
//             name
//             description
//           }
//         }
//       `,
//       variables: {
//         assetRoleTypeId: assetRoleTypeId
//       }
//     }).pipe(map( (res: any) => res.data.getAssetRoleType));
//   }
//
//   addAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType> {
//     return this.apollo.mutate( {
//       mutation: gql`
//         mutation addAssetRoleType(
//           $name: String!,
//           $description: String,
//           $version: String!
//         ) {
//           addAssetRoleType(assetRoleType: {
//             name: $name,
//             description: $description,
//             version: $version
//           }) {
//             assetRoleTypeId
//           }
//         }
//       `,
//       variables: {
//         name: assetRoleType.name,
//         description: assetRoleType.description,
//         version: this.uuid.generateUUID()
//       }
//     }).pipe(map( (res: any) => res.data.addAssetRoleType));
//   }
//
//   updateAssetRoleType(assetRoleType: AssetRoleType): Observable<number> {
//     return this.apollo.mutate( {
//       mutation: gql`
//         mutation updateAssetRoleType(
//           $assetRoleTypeId: ID!,
//           $name: String!,
//           $description: String
//           $version: String!
//         ) {
//           updateAssetRoleType(
//             assetRoleTypeId: $assetRoleTypeId,
//             assetRoleType: {
//               name: $name,
//               description: $description
//               version: $version
//             })
//         }
//       `,
//       variables: {
//         assetRoleTypeId: assetRoleType.assetRoleTypeId,
//         name: assetRoleType.name,
//         description: assetRoleType.description,
//         version: assetRoleType.version
//       }
//     }).pipe(map( (res: any) => res.data.updateAssetRoleType));
//   }
//
//   deleteAssetRoleType(assetRoleTypeId: string): Observable<number> {
//     return this.apollo.mutate( {
//       mutation: gql`
//         mutation deleteAssetRoleType($assetRoleTypeId: ID!) {
//           deleteAssetRoleType(assetRoleTypeId: $assetRoleTypeId)
//         }
//       `,
//       variables: {
//         assetRoleTypeId: assetRoleTypeId,
//       }
//     }).pipe(map( (res: any) => res.data.deleteAssetRoleType));
//   }
//
// }
