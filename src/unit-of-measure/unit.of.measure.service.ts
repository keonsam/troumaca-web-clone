import {UnitOfMeasure} from './unit.of.measure';
import {Observable} from 'rxjs';
import { UnitOfMeasures} from './unit.of.measures';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';

export class UnitOfMeasureService {

  constructor(private apollo: Apollo) {}

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.apollo.query( {
      query: gql`
        query findUnitOfMeasurements($searchStr: String!, $pageSize: Int!) {
          findUnitOfMeasurements(searchStr: $searchStr, pageSize: $pageSize) {
            unitOfMeasurementId
            name
          }
        }
      `,
      variables: {
        searchStr,
        pageSize
      }
    }).pipe(map( (res: any) => res.data.findUnitOfMeasurements));
  }

  getUnitOfMeasures(pageNumber: number, pageSize: number, sortOrder: string): Observable<UnitOfMeasures> {
    return this.apollo.query( {
      query: gql`
        query getUnitOfMeasurements($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
          getUnitOfMeasurements(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
            unitOfMeasures {
              unitOfMeasurementId
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
    }).pipe(map( (res: any) => res.data.getUnitOfMeasurements));
  }

  getUnitOfMeasure(unitOfMeasurementId: string): Observable<UnitOfMeasure> {
    return this.apollo.query( {
      query: gql`
        query getUnitOfMeasurement($unitOfMeasurementId: ID!) {
          getUnitOfMeasurement(unitOfMeasurementId: $unitOfMeasurementId) {
            unitOfMeasurementId
            name
            description
          }
        }
      `,
      variables: {
        unitOfMeasurementId: unitOfMeasurementId
      }
    }).pipe(map( (res: any) => res.data.getUnitOfMeasurement));
  }

  addUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation addUnitOfMeasurement($name: String!, $description: String) {
          addUnitOfMeasurement(unitOfMeasurement: {name: $name, description: $description}) {
            unitOfMeasurementId
          }
        }
      `,
      variables: {
        name: unitOfMeasure.name,
        description: unitOfMeasure.description
      }
    }).pipe(map( (res: any) => res.data.addUnitOfMeasurement));
  }

  updateUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<number> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation updateUnitOfMeasurement($unitOfMeasurementId: ID!, $name: String!, $description: String) {
          updateUnitOfMeasurement(unitOfMeasurementId: $unitOfMeasurementId, unitOfMeasurement: {name: $name, description: $description})
        }
      `,
      variables: {
        unitOfMeasurementId: unitOfMeasure.unitOfMeasurementId,
        name: unitOfMeasure.name,
        description: unitOfMeasure.description
      }
    }).pipe(map( (res: any) => res.data.updateUnitOfMeasurement));
  }

  deleteUnitOfMeasure(unitOfMeasurementId: string): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteUnitOfMeasurement($unitOfMeasurementId: ID!) {
          deleteUnitOfMeasurement(unitOfMeasurementId: $unitOfMeasurementId)
        }
      `,
      variables: {
        unitOfMeasurementId: unitOfMeasurementId,
      }
    }).pipe(map( (res: any) => res.data.deleteUnitOfMeasurement));
  }

}
