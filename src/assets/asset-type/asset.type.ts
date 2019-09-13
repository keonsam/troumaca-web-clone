import {Attribute} from '../attributes/attribute';

export class AssetType {
  name: string;
  description: string;
  share: boolean;
  use: boolean;
  attribute: Attribute[]
}
