import {UUIDGenerator} from '../../uuid.generator';
import {Apollo} from 'apollo-angular';
import {AssetType} from './asset.type';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import gql from 'graphql-tag';
import {AssetTypes} from './asset.types';

export class AssetTypeService {
  uuid = new UUIDGenerator();

  constructor(private apollo: Apollo) {
  }

  saveAssetType(assetType: AssetType): Observable<AssetType> {
    return this.apollo.mutate({
      mutation: gql`
        mutation addAssetType(
            $name: String!,
            $description: String,
            $color: String!,
            $share: Boolean,
            $use: Boolean,
            $characteristics: [SelectedCharacteristicsInput!]
        ) {
            addAssetType(data: {
                    name: $name,
                    description: $description,
                    color: $color,
                    share: $share,
                    use: $use,
                    characteristics: $characteristics
                }) {
                assetTypeId
                name
            }
        }
      `,
      variables: {
        name: assetType.name,
        description: assetType.description,
        color: assetType.color,
        share: assetType.share,
        use: assetType.use,
        characteristics: assetType.characteristics
      }
    }).pipe(map( (res: any) => {
      if (res && res.data && res.data.addAssetType) {
        return res.data.addAssetType;
      }else {
        return res;
      }
    }));
  }

  getAssetTypes(tab?: string, search?: string): Observable<AssetTypes> {
    return this.apollo.query({
      query: gql`
        query getAssetTypes(
        $tab: String
        $search: String
        ) {
            getAssetTypes(data: {
                    tab: $tab
                    search: $search
                }) {
                recent {
                    assetTypeId
                    name
                    color
                }
                recommended {
                    assetTypeId
                    name
                    color
                }
            }
        }
      `,
      variables: {
        tab: tab,
        search: search
      }
    }).pipe(map( (res: any) => {
      if (res && res.data && res.data.getAssetTypes) {
        return res.data.getAssetTypes;
      }else {
        return res;
      }
    }));
  }
}
