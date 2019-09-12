import {UUIDGenerator} from '../../uuid.generator';
import {Apollo} from 'apollo-angular';
import {Attribute} from './attribute';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import gql from 'graphql-tag';
import {Attributes} from './attributes';

export class AttributeService {
  uuid = new UUIDGenerator();
  constructor(private apollo: Apollo) {
  }

  saveAttribute(attribute: Attribute): Observable<Attribute> {
    return this.apollo.mutate({
      mutation: gql`
          mutation addAssetCharacteristic(
              $assetCharacteristicTypeId: ID!,
              $name: String!,
              $defaultValue: String,
              $description: String,
              $preFilled: Boolean,
              $required: Boolean
          ) {
              addAssetCharacteristic(data: {
                      assetCharacteristicTypeId: $assetCharacteristicTypeId,
                      name: $name,
                      defaultValue: $defaultValue,
                      description: $description,
                      preFilled: $preFilled,
                      required: $required
                  }
              ) {
                  assetCharacteristicId
                  assetCharacteristicTypeId
                  name
              }
          }
      `,
      variables: {
        assetCharacteristicTypeId: attribute.assetCharacteristicTypeId,
        name: attribute.name,
        defaultValue: attribute.defaultValue,
        description: attribute.description,
        preFilled: attribute.preFilled,
        required: attribute.required
      }
    }).pipe(map( (res: any) => {
      if (res && res.data && res.data.addAssetCharacteristic) {
        return res.data.addAssetCharacteristic;
      }else {
        return res;
      }
    }));
  }

  getAttributes(): Observable<Attributes> {
    return this.apollo.query({
      query: gql`
        query getAssetCharacteristics {
            getAssetCharacteristics {
                assetCharacteristics {
                    assetCharacteristicId
                    assetCharacteristicTypeId
                    name
                }
            }
        }
      `
    }).pipe(map( (res: any) => {
      if (res && res.data && res.data.getAssetCharacteristics) {
        return res.data.getAssetCharacteristics;
      }else {
        return res;
      }
    }))
  }
}
