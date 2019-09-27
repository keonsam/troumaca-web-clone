import {Attribute} from '../attributes/attribute';

export class AssetType {
  assetTypeId: string;
  name: string;
  description: string;
  color: string;
  share: boolean;
  use: boolean;
  attribute: Attribute[]
}
