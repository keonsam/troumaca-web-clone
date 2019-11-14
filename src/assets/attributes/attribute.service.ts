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
              $list: [String!],
#              $defaultValue: String,
              $description: String,
              $type: String,
              $format: String
#              $preFilled: Boolean,
#              $required: Boolean
          ) {
              addAssetCharacteristic(data: {
                assetCharacteristicTypeId: $assetCharacteristicTypeId,
                name: $name,
                list: $list
                #                      defaultValue: $defaultValue,
                description: $description,
                type: $type,
                format: $format
                #                      preFilled: $preFilled,
                #                      required: $required
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
        list: attribute.list,
        // defaultValue: attribute.defaultValue,
        description: attribute.description,
        type: attribute.type,
        format: attribute.date
        // preFilled: attribute.preFilled,
        // required: attribute.required
      }
    }).pipe(map( (res: {
      data: {
        addAssetCharacteristic
      }
    }) => {
      if (res && res.data && res.data.addAssetCharacteristic) {
        return res.data.addAssetCharacteristic;
      }else {
        return res;
      }
    }));
  }

  getAttributes(tab?: string, search?: string, selected?: string[]): Observable<Attributes> {
    return this.apollo.query({
      query: gql`
        query getAssetCharacteristics($tab: String, $search: String, $selected: [String!]) {
            getAssetCharacteristics(
                data: {
                    tab: $tab,
                    search: $search,
                    selected: $selected
                }) {
                assetCharacteristics {
                    assetCharacteristicId
                    assetCharacteristicTypeId
                    name
                }
            }
        }
      `,
      variables: {
        tab: tab,
        search: search,
        selected: selected || []
      }
    }).pipe(map( (res: any) => {
      if (res && res.data && res.data.getAssetCharacteristics) {
        return res.data.getAssetCharacteristics;
      }else {
        return res;
      }
    }))
  }
}
