import {AssetCharacteristic} from './asset.characteristic';
import {Observable} from 'rxjs';
import {AssetCharacteristics} from './asset.characteristics';
import {UnitOfMeasure} from '../unit-of-measure/unit.of.measure';
import {Apollo} from 'apollo-angular';
import {AssetCharacteristicType} from './asset.characteristic.type';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {UUIDGenerator} from '../uuid.generator';

export class AssetCharacteristicService {

  uuid = new UUIDGenerator();

  constructor(private apollo: Apollo) {
  }

  findAssetCharacteristics(searchStr: string, pageSize: number): Observable<AssetCharacteristic[]> {
    return this.apollo.query( {
      query: gql`
        query findAssetCharacteristics($searchStr: String!, $pageSize: Int!) {
          findAssetCharacteristics(searchStr: $searchStr, pageSize: $pageSize) {
            assetCharacteristicId
            name
          }
        }
      `,
      variables: {
        searchStr,
        pageSize
      }
    }).pipe(map( (res: any) => res.data.findAssetCharacteristics));
  }

  getAssetCharacteristics(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetCharacteristics> {
    return this.apollo.query( {
      query: gql`
        query getAssetCharacteristics($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
          getAssetCharacteristics(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
            assetCharacteristics {
              assetCharacteristicId
              name
              defaultValue
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
    }).pipe(map( (res: any) => res.data.getAssetCharacteristics));
  }

  getAssetCharacteristic(assetCharacteristicId: string): Observable<AssetCharacteristic> {
    return this.apollo.query( {
      query: gql`
        query getAssetCharacteristic($assetCharacteristicId: ID!) {
          getAssetCharacteristic(assetCharacteristicId: $assetCharacteristicId) {
            assetCharacteristicId
            name
            assetCharacteristicTypeId
            assetCharacteristicType {
              name
            }
            defaultValue
            description
            unitOfMeasurementId
            unitOfMeasurement {
              name
            }
            formula
            calculationLevel
            maximumValue
            minimumValue
            categoryValue
            effectiveDate
            untilDate
          }
        }
      `,
      variables: {
        assetCharacteristicId: assetCharacteristicId
      }
    }).pipe(map( (res: any) => res.data.getAssetCharacteristic));
  }

  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<AssetCharacteristic> {
    return this.apollo.mutate({
      mutation: gql`
        mutation addAssetCharacteristic(
        $name: String!,
        $assetCharacteristicTypeId: ID!,
        $defaultValue: String,
        $description: String,
        $unitOfMeasurementId: ID,
        $formula: String,
        $calculationLevel: String,
        $maximumValue: String,
        $minimumValue: String,
        $categoryValue: String,
        $effectiveDate: String,
        $untilDate: String
        $version: String!
        ) {
          addAssetCharacteristic(
            assetCharacteristic: {
              name: $name,
              assetCharacteristicTypeId: $assetCharacteristicTypeId,
              defaultValue: $defaultValue,
              description: $description,
              unitOfMeasurementId: $unitOfMeasurementId,
              formula: $formula,
              calculationLevel: $calculationLevel,
              maximumValue: $maximumValue,
              minimumValue: $minimumValue,
              categoryValue: $categoryValue,
              effectiveDate: $effectiveDate,
              untilDate: $untilDate,
              version: $version
            }
          ) {
            assetCharacteristicId
          }
        }
      `,
      variables: {
        assetCharacteristicTypeId: assetCharacteristic.assetCharacteristicTypeId,
        name: assetCharacteristic.name,
        defaultValue: assetCharacteristic.defaultValue,
        description: assetCharacteristic.description,
        unitOfMeasurementId: assetCharacteristic.unitOfMeasurementId,
        formula: assetCharacteristic.formula,
        calculationLevel: assetCharacteristic.calculationLevel,
        maximumValue: assetCharacteristic.maximumValue,
        minimumValue: assetCharacteristic.minimumValue,
        categoryValue: assetCharacteristic.categoryValue,
        effectiveDate: assetCharacteristic.effectiveDate,
        untilDate: assetCharacteristic.untilDate,
        version: this.uuid.generateUUID()
      }
    }).pipe(map( (res: any) => {
      console.log(res);
      return res.data.addAssetCharacteristic;
    }));
  }

  updateAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<number> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation updateAssetCharacteristic(
        $assetCharacteristicId: ID!,
        $assetCharacteristicTypeId: ID!
        $name: String!
        $defaultValue: String
        $description: String!
        $unitOfMeasurementId: String
        $formula: String
        $calculationLevel: String
        $maximumValue: String
        $minimumValue: String
        $categoryValue: String
        $effectiveDate: String
        $untilDate: String,
        $version: String!
        ) {
          updateAssetCharacteristic(
            assetCharacteristicId: $assetCharacteristicId,
            assetCharacteristic: {
              assetCharacteristicTypeId: $assetCharacteristicTypeId,
              name: $name,
              defaultValue: $defaultValue,
              description: $description,
              unitOfMeasurementId: $unitOfMeasurementId,
              formula: $formula,
              calculationLevel: $calculationLevel,
              maximumValue: $maximumValue,
              minimumValue: $minimumValue,
              categoryValue: $categoryValue,
              effectiveDate: $effectiveDate,
              untilDate: $untilDate,
              version: $version
            }
          )
        }
      `,
      variables: {
        assetCharacteristicId: assetCharacteristic.assetCharacteristicId,
        assetCharacteristicTypeId: assetCharacteristic.assetCharacteristicTypeId,
        name: assetCharacteristic.name,
        defaultValue: assetCharacteristic.defaultValue,
        description: assetCharacteristic.description || '',
        unitOfMeasurementId: assetCharacteristic.unitOfMeasurementId,
        formula: assetCharacteristic.formula,
        calculationLevel: assetCharacteristic.calculationLevel,
        maximumValue: assetCharacteristic.maximumValue,
        minimumValue: assetCharacteristic.minimumValue,
        categoryValue: assetCharacteristic.categoryValue,
        effectiveDate: assetCharacteristic.effectiveDate,
        untilDate: assetCharacteristic.untilDate,
        version: assetCharacteristic.version
      }
    }).pipe(map( (res: any) => res.data.updateAssetCharacteristic));
  }

  deleteAssetCharacteristic(assetCharacteristicId: string): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteAssetCharacteristic($assetCharacteristicId: ID!) {
          deleteAssetCharacteristic(assetCharacteristicId: $assetCharacteristicId)
        }
      `,
      variables: {
        assetCharacteristicId: assetCharacteristicId,
      }
    }).pipe(map( (res: any) => res.data.deleteAssetCharacteristic));
  }

  // OTHERS

  getTypes(): Observable<AssetCharacteristicType[]> {
    return this.apollo.query( {
      query: gql`
        query getAssetCharacteristicTypes {
          getAssetCharacteristicTypes {
            assetCharacteristicTypeId
            name
          }
        }
      `,
    }).pipe(map( (res: any) => res.data.getAssetCharacteristicTypes));
  }

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

}
