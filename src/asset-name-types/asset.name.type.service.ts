import {AssetNameType} from './asset.name.type';
import {Observable} from 'rxjs';
import {AssetNameTypes} from './asset.name.types';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';
import gql from 'graphql-tag';


export class AssetNameTypeService {

  constructor(private apollo: Apollo) {}

  findAssetNameTypes(searchStr: string, pageSize: number): Observable<AssetNameType[]> {
    return this.apollo.query( {
      query: gql`
        query findAssetNameTypes($searchStr: String!, $pageSize: Int!) {
          findAssetNameTypes(searchStr: $searchStr, pageSize: $pageSize) {
            assetNameTypeId
            name
          }
        }
      `,
      variables: {
        searchStr,
        pageSize
      }
    }).pipe(map( (res: any) => res.data.findAssetNameTypes));
  }

  getAssetNameTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetNameTypes> {
    return this.apollo.query( {
      query: gql`
        query getAssetNameTypes($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
          getAssetNameTypes(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
            assetNameTypes {
              assetNameTypeId
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
    }).pipe(map( (res: any) => res.data.getAssetNameTypes));
  }

  getAssetNameType(assetNameTypeId: string): Observable<AssetNameType> {
    return this.apollo.query( {
      query: gql`
        query getAssetNameType($assetNameTypeId: ID!) {
          getAssetNameType(assetNameTypeId: $assetNameTypeId) {
            assetNameTypeId
            name
            description
          }
        }
      `,
      variables: {
        assetNameTypeId: assetNameTypeId
      }
    }).pipe(map( (res: any) => res.data.getAssetNameType));
  }

  addAssetNameType(assetNameType: AssetNameType): Observable<AssetNameType> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation addAssetNameType($name: String!, $description: String) {
          addAssetNameType(assetNameType: {name: $name, description: $description}) {
            assetNameTypeId
          }
        }
      `,
      variables: {
        name: assetNameType.name,
        description: assetNameType.description
      }
    }).pipe(map( (res: any) => {
      console.log(res);
      return res.data.addAssetNameType;
    }));
  }

  updateAssetNameType(assetNameType: AssetNameType): Observable<number> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation updateAssetNameType($assetNameTypeId: ID!, $name: String!, $description: String) {
          updateAssetNameType(assetNameTypeId: $assetNameTypeId, assetNameType: {name: $name, description: $description})
        }
      `,
      variables: {
        assetNameTypeId: assetNameType.assetNameTypeId,
        name: assetNameType.name,
        description: assetNameType.description
      }
    }).pipe(map( (res: any) => res.data.updateAssetNameType));
  }

  deleteAssetNameType(assetNameTypeId: string): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteAssetNameType($assetNameTypeId: ID!) {
          deleteAssetNameType(assetNameTypeId: $assetNameTypeId)
        }
      `,
      variables: {
        assetNameTypeId: assetNameTypeId,
      }
    }).pipe(map( (res: any) => res.data.deleteAssetNameType));
  }
}
