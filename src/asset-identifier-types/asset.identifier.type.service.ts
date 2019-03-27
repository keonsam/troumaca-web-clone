import {AssetIdentifierType} from './asset.identifier.type';
import {Observable} from 'rxjs';
import {AssetIdentifierTypes} from './asset.identifier.types';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

export class AssetIdentifierTypeService {

  constructor(private apollo: Apollo) {}

  findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]> {
    return this.apollo.query( {
      query: gql`
        query findAssetIdentifierTypes($searchStr: String!, $pageSize: Int!) {
          findAssetIdentifierTypes(searchStr: $searchStr, pageSize: $pageSize) {
            assetIdentifierTypeId
            name
          }
        }
      `,
      variables: {
        searchStr,
        pageSize
      }
    }).pipe(map( (res: any) => res.data.findAssetIdentifierTypes));
  }

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetIdentifierTypes> {
    return this.apollo.query( {
      query: gql`
        query getAssetIdentifierTypes($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
          getAssetIdentifierTypes(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
            assetIdentifierTypes {
              assetIdentifierTypeId
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
    }).pipe(map( (res: any) => res.data.getAssetIdentifierTypes));
  }

  getAssetIdentifierType(assetIdentifierTypeId: string): Observable<AssetIdentifierType> {
    return this.apollo.query( {
      query: gql`
        query getAssetIdentifierType($assetIdentifierTypeId: ID!) {
          getAssetIdentifierType(assetIdentifierTypeId: $assetIdentifierTypeId) {
            assetIdentifierTypeId
            name
            description
          }
        }
      `,
      variables: {
        assetIdentifierTypeId: assetIdentifierTypeId
      }
    }).pipe(map( (res: any) => res.data.getAssetIdentifierType));
  }

  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<AssetIdentifierType> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation addAssetIdentifierType($name: String!, $description: String!) {
          addAssetIdentifierType(name: $name, description: $description) {
            assetIdentifierTypeId
          }
        }
      `,
      variables: {
        name: assetIdentifierType.name,
        description: assetIdentifierType.description || ''
      }
    }).pipe(map( (res: any) => res.data.addAssetIdentifierType));
  }

  updateAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<number> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation updateAssetIdentifierType($assetIdentifierTypeId: ID!, $name: String!, $description: String!) {
          updateAssetIdentifierType(assetIdentifierTypeId: $assetIdentifierTypeId, name: $name, description: $description)
        }
      `,
      variables: {
        assetIdentifierTypeId: assetIdentifierType.assetIdentifierTypeId,
        name: assetIdentifierType.name,
        description: assetIdentifierType.description || ''
      }
    }).pipe(map( (res: any) => res.data.updateAssetIdentifierType));
  }

  deleteAssetIdentifierType(assetIdentifierTypeId: string): Observable<number> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation deleteAssetIdentifierType($assetIdentifierTypeId: ID!) {
          deleteAssetIdentifierType(assetIdentifierTypeId: $assetIdentifierTypeId)
        }
      `,
      variables: {
        assetIdentifierTypeId: assetIdentifierTypeId,
      }
    }).pipe(map( (res: any) => res.data.deleteAssetIdentifierType));
  }

}
