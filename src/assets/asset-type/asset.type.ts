import {Characteristic} from './characteristic';

export class AssetType {
  assetTypeId: string;
  name: string;
  description: string;
  color: string;
  share: boolean;
  use: boolean;
  characteristics: Characteristic[]
}
