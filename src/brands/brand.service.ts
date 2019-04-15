import {Brand} from './brand';
import {Observable} from 'rxjs';
import {Brands} from './brands';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {UUIDGenerator} from '../uuid.generator';

export class BrandService {

  uuid = new UUIDGenerator();
  constructor(private apollo: Apollo) {}

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

  getBrands(pageNumber: number, pageSize: number, sortOrder: string): Observable<Brands> {
    return this.apollo.query( {
      query: gql`
        query getBrands($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
          getBrands(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
            brands {
              brandId
              name
              abbreviation
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
    }).pipe(map( (res: any) => res.data.getBrands));
  }

  getBrand(brandId: string): Observable<Brand> {
    return this.apollo.query( {
      query: gql`
        query getBrand($brandId: ID!) {
          getBrand(brandId: $brandId) {
            brandId
            name
            abbreviation
            description
          }
        }
      `,
      variables: {
        brandId: brandId
      }
    }).pipe(map( (res: any) => res.data.getBrand));  }

  addBrand(brand: Brand): Observable<Brand> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation addBrand(
          $name: String!,
          $abbreviation: String,
          $description: String,
          $version: String!
        ) {
          addBrand(
            brand: {
              name: $name,
              abbreviation: $abbreviation,
              description: $description,
              version: $version
            }) {
            brandId
          }
        }
      `,
      variables: {
        name: brand.name,
        abbreviation: brand.abbreviation,
        description: brand.description,
        version: this.uuid.generateUUID()
      }
    }).pipe(map( (res: any) => res.data.addBrand));
  }

  updateBrand(brand: Brand): Observable<number> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation updateBrand(
        $brandId: ID!,
        $name: String!,
        $abbreviation: String,
        $description: String,
        $version: String
        ) {
          updateBrand(
            brandId: $brandId,
            brand: {
              name: $name,
              abbreviation: $abbreviation,
              description: $description,
              version: $version
            })
        }
      `,
      variables: {
        brandId: brand.brandId,
        name: brand.name,
        abbreviation: brand.abbreviation,
        description: brand.description,
        version: brand.version
      }
    }).pipe(map( (res: any) => res.data.updateBrand));
  }

  deleteBrand(brandId: string): Observable<number> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation deleteBrand($brandId: ID!) {
          deleteBrand(brandId: $brandId)
        }
      `,
      variables: {
        brandId: brandId,
      }
    }).pipe(map( (res: any) => res.data.deleteBrand));
  }

}
